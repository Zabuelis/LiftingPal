import { FlatList, Pressable, View } from "react-native";
import ThemedView from "../../../../components/ThemedView";
import { Colors } from "../../../../constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useWorkouts } from "../../../../hooks/useWorkouts";
import { useEffect, useState } from "react";
import StatusIndicator from "../../../../components/StatusIndicator";
import ThemedText from "../../../../components/ThemedText";
import PressableButton from "../../../../components/PressableButton";
import ThemedInput from "../../../../components/ThemedInput";
import { useWorkoutSessions } from "../../../../hooks/useWorkoutSessions";

const CreateWorkoutSession = () => {
  const { id } = useLocalSearchParams();
  const { workouts } = useWorkouts();
  const { createWorkoutSession } = useWorkoutSessions();
  const [isLoading, setIsLoading] = useState(false);
  const [workout, setWorkout] = useState({});
  const [duration, setDuration] = useState("00:07:02");
  const [caption, setCaption] = useState("My Workout Session");
  const [comments, setComments] = useState(null);
  const [workoutSets, setWorkoutSets] = useState([]);

  function getWorkout() {
    setIsLoading(true);
    setWorkout(workouts[id]);
    setIsLoading(false);
  }

  useEffect(() => {
    getWorkout();
  });

  if (Object.keys(workout).length === 0 || isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <StatusIndicator isLoading={true}></StatusIndicator>
      </View>
    );
  }

  function addSet(id) {
    const newSet = {
      exercise_id: id,
      repetitions: 0,
      weight: 0,
    };
    setWorkoutSets((prev) => [...prev, newSet]);
  }

  function removeSet(createdSet) {
    console.log(workoutSets);
    const newSets = workoutSets.filter((set) => set !== createdSet);
    setWorkoutSets(newSets);
  }

  function updateSet(createdSet, field, value) {
    setWorkoutSets((prev) =>
      prev.map((set) =>
        set === createdSet ? { ...set, [field]: value } : set,
      ),
    );
  }
  const timeStamp = new Date().toLocaleDateString();

  async function submitSession() {
    console.log(workoutSets);
    try {
      const response = await createWorkoutSession(
        workout.workout_id,
        timeStamp,
        duration,
        comments,
        caption,
        workoutSets,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemedView safe>
      <FlatList
        ListHeaderComponent={
          <View style={{ backgroundColor: Colors.surface }} className="h-36">
            <View className="p-4 px-8">
              <View className="flex flex-row gap-8 justify-between items-center">
                <ThemedInput
                  bold
                  className="focus:border-amber-500 text-2xl flex-1 border border-gray-300 rounded-xl"
                  value={caption}
                  onChangeText={setCaption}
                ></ThemedInput>
                <PressableButton
                  onPress={submitSession}
                  className="w-24 h-10 border-red-500 bg-red-400 active:bg-red-600"
                >
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
              <View className="flex-row justify-between gap-16 min-h-16">
                <View className="flex-1 flex-row justify-between items-center">
                  <ThemedText>Set</ThemedText>
                  <ThemedText>Weight</ThemedText>
                  <ThemedText>Reps</ThemedText>
                </View>
                <View className="items-center justify-center">
                  <View className="w-20 h-8 justify-center items-center rounded-xl border border-red-600 active:bg-red-600 bg-red-400">
                    <ThemedText style={{ color: Colors.surface }}>
                      Remove
                    </ThemedText>
                  </View>
                </View>
              </View>
              {workoutSets
                .filter((set) => set.exercise_id === item)
                .map((set, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between gap-16 min-h-16"
                  >
                    <View className="flex-1 flex-row justify-between items-center">
                      <ThemedText numberOfLines={1}># {index + 1}</ThemedText>
                      <ThemedInput
                        className="focus:border-amber-500 w-10 text-center rounded-xl border border-gray-300"
                        value={String(set.weight)}
                        maxLength={5}
                        onChangeText={(value) =>
                          updateSet(set, "weight", value)
                        }
                        inputMode={"numeric"}
                      ></ThemedInput>
                      <ThemedInput
                        className="focus:border-amber-500 w-10 text-center rounded-xl border border-gray-300"
                        value={String(set.repetitions)}
                        maxLength={5}
                        onChangeText={(value) =>
                          updateSet(set, "repetitions", value)
                        }
                        inputMode={"numeric"}
                      ></ThemedInput>
                    </View>
                    <View className="items-center justify-center">
                      <Pressable
                        onPress={() => removeSet(set)}
                        className="w-20 h-8 justify-center  items-center rounded-xl border border-red-600 active:bg-red-600 bg-red-400"
                      >
                        <ThemedText style={{ color: Colors.surface }}>
                          X
                        </ThemedText>
                      </Pressable>
                    </View>
                  </View>
                ))}
              <Pressable
                onPress={() => addSet(item)}
                className="flex-1 active:bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-14 justify-center items-center mt-4"
              >
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
