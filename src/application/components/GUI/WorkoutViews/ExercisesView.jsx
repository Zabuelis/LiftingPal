import ThemedText from "../../ThemedText";
import ScrollablePage from "../../ScrollablePage";
import PressableButton from "../../PressableButton";
import ThemedInput from "../../ThemedInput";
import { View } from "react-native";
import { Colors } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import WorkoutCard from "../Cards/WorkoutCard";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { router } from "expo-router";
import { useRef, useState } from "react";
import SuccessCard from "../Cards/SuccessCard";
import ErrorCard from "../Cards/ErrorCard";
import filterList from "../../../lib/filterList";

const ExercisesView = () => {
  const { exercises, deleteExercise } = useWorkouts();
  const [webError, setWebError] = useState(null);
  const [filter, setFilter] = useState("");
  const [webMessage, setWebMessage] = useState(null);
  const pageTop = useRef(0);

  async function removeExercise(exercise_id) {
    setWebError(null);
    setWebMessage(null);
    try {
      const message = await deleteExercise(exercise_id);
      setWebMessage(message);
    } catch (error) {
      setWebError(error.message);
    } finally {
      pageTop.current?.scrollTo({ y: 0, animated: true });
    }
  }

  function handleCreate() {
    router.replace("/forms/exerciseForm");
  }

  function handleEdit(id) {
    router.replace({
      pathname: "/forms/exerciseForm",
      params: { id },
    });
  }

  const filteredExercises = filterList(exercises, filter);

  return (
    <ScrollablePage ref={pageTop} safeView={false}>
      {webMessage ? <SuccessCard message={webMessage}></SuccessCard> : null}
      {webError ? <ErrorCard error={webError}></ErrorCard> : null}
      <View className="py-6 px-4 flex-row items-center justify-between">
        <ThemedText bold className="text-3xl">
          MY EXERCISES
        </ThemedText>
        <PressableButton onPress={handleCreate} className="w-14 h-14">
          <ThemedText style={{ color: Colors.surface }} className="text-4xl">
            +
          </ThemedText>
        </PressableButton>
      </View>

      <View className="px-6">
        <View
          style={{ backgroundColor: Colors.surface }}
          className="flex-row w-full justify-center items-center h-16 rounded-[4vw] border-gray-300 border-2"
        >
          <Ionicons name="search" size={24} />
          <ThemedInput
            value={filter}
            onChangeText={setFilter}
            placeholder="Search exercises..."
            className="w-5/6 h-14 rounded-[4vw]"
          />
        </View>
        {/* Workout cards */}

        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, index) => (
            <WorkoutCard
              object={exercise}
              key={index}
              delete={removeExercise}
              edit={handleEdit}
            ></WorkoutCard>
          ))
        ) : (
          <ThemedText bold className="text-2xl pt-4">
            Start by inserting your first exercise.
          </ThemedText>
        )}
      </View>
    </ScrollablePage>
  );
};

export default ExercisesView;
