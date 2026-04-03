import { ScrollView, View } from "react-native";
import ThemedView from "../../../components/ThemedView";
import PressableButton from "../../../components/PressableButton";
import ThemedText from "../../../components/ThemedText";
import { Colors } from "../../../constants/Colors";
import { useState } from "react";
import ThemedInput from "../../../components/ThemedInput";
import { useWorkouts } from "../../../hooks/useWorkouts";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExerciseCard from "../../../components/GUI/Cards/ExerciseCard";
import { router } from "expo-router";
import StatusIndicator from "../../../components/StatusIndicator";
import SuccessCard from "../../../components/GUI/Cards/SuccessCard";
import ErrorCard from "../../../components/GUI/Cards/ErrorCard";

const WorkoutForm = () => {
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("");
  const [exercisesList, setExercisesList] = useState([]);
  const [webMessage, setWebMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [webError, setWebError] = useState(null);
  const { exercises, createWorkout } = useWorkouts();

  function appendArray(id) {
    setExercisesList([...exercisesList, id]);
  }

  function removeArray(exercise_id) {
    setExercisesList(
      exercisesList.filter((exercise) => exercise !== exercise_id),
    );
  }

  function isInList(exercise_id) {
    if (exercisesList.find((exercisesList) => exercisesList === exercise_id)) {
      return true;
    }
    return false;
  }

  function isValid() {
    let errors = {};
    if (!name || name === "") errors.name = "Name can't be empty.";
    if (exercisesList === undefined || exercisesList.length === 0) {
      errors.exercises = "You must select at least one exercise";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    setWebMessage(null);
    setWebError(null);
    setIsLoading(true);
    try {
      if (isValid()) {
        const response = await createWorkout(name, exercisesList);
        setName("");
        setExercisesList([]);
        setWebMessage(response);
      }
    } catch (error) {
      setWebError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReturn() {
    setName("");
    setExercisesList([]);
    router.back();
  }

  return (
    <ThemedView safe className="flex-1">
      {webMessage ? <SuccessCard message={webMessage}></SuccessCard> : null}
      {webError ? <ErrorCard error={webError}></ErrorCard> : null}
      <View className="flex-row items-center p-4">
        <PressableButton
          onPress={handleReturn}
          style={{ backgroundColor: Colors.surface }}
          className="w-14 h-14"
        >
          <ThemedText bold className="text-3xl">
            {"<"}
          </ThemedText>
        </PressableButton>
        <ThemedText bold className="pl-4 text-4xl">
          NEW WORKOUT
        </ThemedText>
      </View>
      <View className="p-4">
        <ThemedText className="p-1 text-lg opacity-65">WORKOUT NAME</ThemedText>
        <ThemedInput
          placeholder="Back and Biceps"
          onChangeText={setName}
          value={name}
          style={{ backgroundColor: Colors.surface }}
          className="rounded-[4vw] text-lg focus:border-amber-500 h-16 border-gray-300 border-2"
        ></ThemedInput>
        {errors.name ? (
          <ThemedText
            bold
            style={{ color: Colors.errorText }}
            className="w-full text-left"
          >
            {errors.name}
          </ThemedText>
        ) : null}
        <View className="py-3 border-b border-gray-400"></View>
        <ThemedText className="p-1 pt-3 text-lg opacity-65">
          ADD EXERCISES
        </ThemedText>
        <View
          style={{ backgroundColor: Colors.surface }}
          className="flex-row w-full justify-center items-center h-16 rounded-[4vw] border-gray-300 border-2"
        >
          <Ionicons name="search" size={24} />
          <ThemedInput
            placeholder="Search exercises..."
            className="w-5/6 h-14 rounded-[4vw] text-lg"
          />
        </View>
        {errors.exercises ? (
          <ThemedText
            bold
            style={{ color: Colors.errorText }}
            className="w-full text-left"
          >
            {errors.exercises}
          </ThemedText>
        ) : null}
        <ScrollView className="h-80 mb-2 mt-2">
          {exercises
            ? exercises.map((exercise, index) => (
                <ExerciseCard
                  exercise={exercise}
                  appendArray={appendArray}
                  removeArray={removeArray}
                  isAdded={isInList(exercise.exercise_id)}
                ></ExerciseCard>
              ))
            : null}
        </ScrollView>
        <View className="pb-4 border-t border-gray-400"></View>
        <PressableButton onPress={handleSubmit} className="h-20">
          <ThemedText
            bold
            style={{ color: Colors.surface }}
            className="text-xl "
          >
            Submit
          </ThemedText>
        </PressableButton>
        <StatusIndicator isLoading={isLoading}></StatusIndicator>
      </View>
    </ThemedView>
  );
};

export default WorkoutForm;
