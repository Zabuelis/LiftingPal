import { FlatList, Pressable, View } from "react-native";
import ThemedView from "../../../../components/ThemedView";
import { Colors } from "../../../../constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useWorkouts } from "../../../../hooks/useWorkouts";
import { useEffect, useState } from "react";
import StatusIndicator from "../../../../components/StatusIndicator";
import ThemedText from "../../../../components/ThemedText";
import PressableButton from "../../../../components/PressableButton";

const CreateWorkoutSession = () => {
  const { id } = useLocalSearchParams();
  const { workouts } = useWorkouts();
  const [isLoading, setIsLoading] = useState(false);
  const [workout, setWorkout] = useState({});
  const [duration, setDuration] = useState(null);
  const [sets, setSets] = useState({});

  function getWorkout() {
    setIsLoading(true);
    setWorkout(workouts[id]);
    setIsLoading(false);
  }

  useEffect(() => {
    getWorkout();
  }, [id]);

  if (Object.keys(workout).length === 0 || isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <StatusIndicator isLoading={true}></StatusIndicator>
      </View>
    );
  }

  const timeStamp = new Date().toLocaleDateString();

  return (
    <ThemedView safe>
      <FlatList
        ListHeaderComponent={
          <View style={{ backgroundColor: Colors.surface }} className="h-28">
            <View className="p-4 px-8">
              <View className="flex flex-row justify-between">
                <ThemedText bold className="text-2xl">
                  {workout.name}
                </ThemedText>
                <PressableButton className="w-24 border-red-500 bg-red-400 active:bg-red-600">
                  <ThemedText style={{ color: Colors.surface }}>END</ThemedText>
                </PressableButton>
              </View>
              <View className="pt-4">
                <ThemedText
                  style={{ color: Colors.theme }}
                  bold
                  className="text-2xl"
                >
                  Duration Here
                </ThemedText>
              </View>
            </View>
          </View>
        }
        data={workout.exercise_ids}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex min-h-32 mt-8 mx-6 border border-gray-300 rounded-xl"
          >
            <View className="p-4">
              <ThemedText bold className="text-lg">
                {workout.exercise_names[item - 1]}
              </ThemedText>
              <Pressable className="flex-1 active:bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-14 justify-center items-center mt-4">
                <ThemedText className="opacity-50">+ ADD SET</ThemedText>
              </Pressable>
            </View>
          </View>
        )}
      ></FlatList>
    </ThemedView>
  );
};

export default CreateWorkoutSession;
