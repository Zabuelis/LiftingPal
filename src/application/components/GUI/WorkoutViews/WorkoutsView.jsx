import { Colors } from "../../../constants/Colors";
import PressableButton from "../../PressableButton";
import ScrollablePage from "../../ScrollablePage";
import ThemedInput from "../../ThemedInput";
import ThemedText from "../../ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import WorkoutCard from "../Cards/WorkoutCard";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { useState } from "react";
import SuccessCard from "../Cards/SuccessCard";
import ErrorCard from "../Cards/ErrorCard";
import { router } from "expo-router";

const WorkoutsView = () => {
  const { workouts, deleteWorkout } = useWorkouts({});
  const [webMessage, setWebMessage] = useState(null);
  const [webError, setWebError] = useState(null);

  async function removeWorkout(workout_id) {
    setWebError(null);
    setWebMessage(null);
    try {
      const message = await deleteWorkout(workout_id);
      setWebMessage(message);
    } catch (error) {
      setWebError(error.message);
    }
  }

  function handleCreate() {
    router.push("/workoutForm");
  }

  return (
    <ScrollablePage safeView={false}>
      {webMessage ? <SuccessCard webMessage={webMessage}></SuccessCard> : null}
      {webError ? <ErrorCard error={webError}></ErrorCard> : null}
      <View className="py-6 px-4 flex-row items-center justify-between">
        <ThemedText bold className="text-3xl">
          MY WORKOUTS
        </ThemedText>
        <PressableButton className="w-14 h-14" onPress={handleCreate}>
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
            placeholder="Search workouts..."
            className="w-5/6 h-14 rounded-[4vw]"
          />
        </View>
        {/* Workout cards */}
        {workouts ? (
          workouts.map((workout, index) => (
            <WorkoutCard
              object={workout}
              key={index}
              delete={removeWorkout}
            ></WorkoutCard>
          ))
        ) : (
          <ThemedText bold className="text-2xl pt-4">
            Start by inserting your first workout.
          </ThemedText>
        )}
      </View>
    </ScrollablePage>
  );
};

export default WorkoutsView;
