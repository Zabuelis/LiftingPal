import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useWorkoutSessions } from "../../../../hooks/useWorkoutSessions";
import ThemedView from "../../../../components/ThemedView";
import ThemedText from "../../../../components/ThemedText";
import StatusIndicator from "../../../../components/StatusIndicator";
import ErrorCard from "../../../../components/GUI/Cards/ErrorCard";
import { Alert, FlatList, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import PressableButton from "../../../../components/PressableButton";

const WorkoutSession = () => {
  const { workoutSession, fetchWorkoutSession, deleteWorkoutSession } =
    useWorkoutSessions();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [webError, setWebError] = useState(null);
  const [webResponse, setWebResponse] = useState(null);

  async function fetchRecord() {
    setIsLoading(true);
    setWebError(null);
    try {
      await fetchWorkoutSession(id);
    } catch (error) {
      setWebError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRecord();
  }, [id]);

  if (webError) {
    return (
      <ThemedView className="flex-1 items-center pt-16">
        <ErrorCard error={webError}></ErrorCard>
      </ThemedView>
    );
  } else if (!workoutSession || workoutSession === undefined || isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <StatusIndicator isLoading={true}></StatusIndicator>
      </ThemedView>
    );
  }

  function computeTotalExercises() {
    const unique = (arr) => [...new Set(workoutSession.exercise_names)];
    return unique.length;
  }

  function computeTotalVolume() {
    var total = 0;
    for (var i = 0; i < workoutSession.exercise_names.length; i++) {
      total +=
        workoutSession.exercise_weights[i] * workoutSession.repetitions[i];
    }
    return total;
  }

  function computeTotalReps() {
    var total = 0;
    for (var i = 0; i < workoutSession.repetitions.length; i++) {
      total += workoutSession.repetitions[i];
    }
    return total;
  }

  const totalExercises = computeTotalExercises();
  const totalSets = workoutSession.exercise_names.length;
  const totalKG = computeTotalVolume();
  const totalReps = computeTotalReps();
  const zippedExercises = workoutSession.exercise_names.map((name, index) => ({
    exercise_name: name,
    exercise_weight: workoutSession.exercise_weights[index],
    repetition: workoutSession.repetitions[index],
  }));

  function handleDelete() {
    Alert.alert(
      "Record removal",
      "Are you sure you want to delete selected record?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Remove",
          onPress: () => deleteRecord(),
        },
      ],
    );
  }

  async function deleteRecord() {
    setIsLoading(true);
    setWebError(null);
    try {
      const response = await deleteWorkoutSession(id);
      router.navigate("/history");
    } catch (error) {
      setWebError(error.message);
    }
  }

  return (
    <ThemedView safe>
      <View>
        <View
          style={{ backgroundColor: Colors.surface }}
          className="h-36 px-8 border-1 border-b border-gray-300"
        >
          <View className="flex-row justify-between items-center py-4">
            <ThemedText bold numberOfLines={1} className="text-xl">
              {workoutSession.caption}
            </ThemedText>
            <PressableButton
              onPress={handleDelete}
              className="h-10 w-20 bg-red-400"
            >
              <ThemedText style={{ color: Colors.surface }} bold>
                Delete
              </ThemedText>
            </PressableButton>
          </View>
          <View className="flex-row gap-4 items-center">
            <ThemedText bold theme className="text-4xl">
              {workoutSession.duration}
            </ThemedText>
            <View>
              <ThemedText bold className="text-2xl">
                {totalExercises}
              </ThemedText>
              <ThemedText>EXER</ThemedText>
            </View>
            <View>
              <ThemedText bold className="text-2xl">
                {totalSets}
              </ThemedText>
              <ThemedText>SETS</ThemedText>
            </View>
            <View>
              <ThemedText bold className="text-2xl">
                {totalKG}
              </ThemedText>
              <ThemedText>KG VOL</ThemedText>
            </View>
            <View>
              <ThemedText bold className="text-2xl">
                {totalReps}
              </ThemedText>
              <ThemedText>REPS</ThemedText>
            </View>
          </View>
        </View>
        {workoutSession.comments !== "null" ? (
          <View
            style={{ backgroundColor: Colors.surface }}
            className="h-36 px-8 py-4"
          >
            <ThemedText>{workoutSession.comments}</ThemedText>
          </View>
        ) : null}
      </View>

      <FlatList
        className="px-4"
        data={zippedExercises}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: Colors.surface }}
            className="h-24 mt-4 p-4 border-1 border-gray-300 items-center flex-row"
          >
            <View className="flex-2">
              <ThemedText bold className="text-2xl">
                {item.exercise_name}
              </ThemedText>
            </View>
            <View className="flex-1 items-center">
              <ThemedText bold className="text-2xl">
                {item.exercise_weight}
              </ThemedText>
            </View>
            <View className="flex-1 items-end">
              <ThemedText bold className="text-2xl">
                {item.repetition}
              </ThemedText>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View
            style={{ backgroundColor: Colors.surface }}
            className="h-26 mt-4 p-4 border-1 border-gray-300 items-center flex-row"
          >
            <View className="flex-2">
              <ThemedText bold className="text-xl">
                Exercise Name
              </ThemedText>
            </View>
            <View className="flex-1 items-center">
              <ThemedText bold className="text-xl">
                KG
              </ThemedText>
            </View>
            <View className="flex-1 items-end">
              <ThemedText bold className="text-xl">
                Reps
              </ThemedText>
            </View>
          </View>
        }
        ListFooterComponent={<View className="mb-4 h-8"></View>}
      ></FlatList>
    </ThemedView>
  );
};

export default WorkoutSession;
