import { Alert, BackHandler, FlatList, Pressable, View } from "react-native";
import ThemedView from "../../../../components/ThemedView";
import { Colors } from "../../../../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { useWorkouts } from "../../../../hooks/useWorkouts";
import { useEffect, useRef, useState } from "react";
import StatusIndicator from "../../../../components/StatusIndicator";
import ThemedText from "../../../../components/ThemedText";
import PressableButton from "../../../../components/PressableButton";
import ThemedInput from "../../../../components/ThemedInput";
import { useWorkoutSessions } from "../../../../hooks/useWorkoutSessions";
import ErrorCard from "../../../../components/GUI/Cards/ErrorCard";

const CreateWorkoutSession = () => {
  const { id } = useLocalSearchParams();
  const maxChars = 128;
  const { workouts } = useWorkouts();
  const { createWorkoutSession } = useWorkoutSessions();
  const [isLoading, setIsLoading] = useState(false);
  const [workout, setWorkout] = useState({});
  const [caption, setCaption] = useState("My Workout Session");
  const [comments, setComments] = useState(null);
  const [workoutSets, setWorkoutSets] = useState([]);
  const [errors, setErrors] = useState({});
  const [webError, setWebError] = useState(null);
  const timerInterval = useRef(null);
  const [duration, setDuration] = useState(0);
  const [timeStamp, setTimeStamp] = useState(null);

  function finishSession() {
    Alert.alert(
      "End Workout",
      "Are you sure you want to finish your workout?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Finish",
          onPress: () => submitSession(),
        },
      ],
    );
  }

  function handleReturn() {
    Alert.alert(
      "Return",
      "Are you sure you want to go back? Progress will be lost.",
      [
        {
          text: "Cancel",
        },
        {
          text: "Return",
          onPress: () => ret(),
        },
      ],
    );
    return true;
  }

  function ret() {
    router.replace("/workouts");
  }

  function validateFields() {
    let errors = {};
    if (caption.length < 1) {
      errors.caption = "Caption can't be empty.";
    }
    if (workoutSets.length === 0) {
      errors.sets = "You must complete atleast one exercise.";
    }
    workoutSets.forEach((set) => {
      const weight = parseInt(set.weight);
      const repetitions = parseInt(set.repetitions);
      const index = workout.exercise_ids.indexOf(set.exercise_id);
      if (!weight || weight < 1) {
        errors.weight =
          workout.exercise_names[index] + ": has an empty weight field.";
      } else if (!repetitions || repetitions < 1) {
        errors.repetitions =
          workout.exercise_names[index] + ": has an empty repetitions field.";
      }
    });

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function getWorkout() {
    setIsLoading(true);
    const workout = workouts.find(
      (workout) => workout.workout_id === parseInt(id),
    );
    setWorkout(workout);
    setIsLoading(false);
  }

  useEffect(() => {
    getWorkout();
    setTimeStamp(new Date().toLocaleDateString());
    setErrors({});
    setWebError(null);
    startTimer();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleReturn,
    );
    return () => {
      setDuration(0);
      setWorkoutSets([]);
      clearInterval(timerInterval.current);
      backHandler.remove();
    };
  }, []);

  function addSet(id) {
    const newSet = {
      exercise_id: id,
      repetitions: 0,
      weight: 0,
    };
    setWorkoutSets((prev) => [...prev, newSet]);
  }

  function removeSet(createdSet) {
    const newSets = workoutSets.filter((set) => set !== createdSet);
    setWorkoutSets(newSets);
  }

  function updateSet(createdSet, field, value) {
    setWorkoutSets((prev) =>
      prev.map((set) =>
        set === createdSet
          ? { ...set, [field]: value.replace(/^0+(?=\d)/, "") }
          : set,
      ),
    );
  }

  async function submitSession() {
    setIsLoading(true);
    setErrors(null);
    setWebError(null);
    try {
      if (validateFields()) {
        const response = await createWorkoutSession(
          workout.workout_id,
          timeStamp,
          duration,
          comments,
          caption,
          workoutSets,
        );
        router.replace("/history");
      }
    } catch (error) {
      setWebError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (Object.keys(workout).length === 0 || isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <StatusIndicator isLoading={true}></StatusIndicator>
      </View>
    );
  }

  if (webError) {
    return (
      <ThemedView safe>
        <ErrorCard error={webError}></ErrorCard>;
      </ThemedView>
    );
  }

  function formatTime(time) {
    const h = Math.floor(time / 3600)
      .toString()
      .padStart(2, 0);
    const m = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, 0);
    const s = (time % 60).toString().padStart(2, 0);

    return `${h}:${m}:${s}`;
  }

  function startTimer() {
    const startTime = Date.now() - duration * 1000;
    timerInterval.current = setInterval(() => {
      setDuration(formatTime(Math.floor((Date.now() - startTime) / 1000)));
    }, 1000);
  }

  return (
    <ThemedView safe>
      <FlatList
        ListHeaderComponent={
          <View className="mb-36">
            {Object.keys(errors).length !== 0 ? (
              <View className="bg-red-400 min-h-16 border-red-800 border-2 items-center justify-center">
                {Object.keys(errors).map((key) => (
                  <ThemedText key={key} bold>
                    {errors[key]}
                  </ThemedText>
                ))}
              </View>
            ) : null}
            <View style={{ backgroundColor: Colors.surface }} className="h-36">
              <View className="p-4 px-8">
                <View className="flex flex-row gap-8 justify-between items-center">
                  <ThemedInput
                    bold
                    className="focus:border-amber-500 text-2xl flex-1 border border-gray-300 rounded-xl"
                    value={caption}
                    maxLength={maxChars}
                    onChangeText={setCaption}
                  ></ThemedInput>
                  <PressableButton
                    onPress={finishSession}
                    className="w-24 h-10 border-red-500 bg-red-400 active:bg-red-600"
                  >
                    <ThemedText style={{ color: Colors.surface }}>
                      END
                    </ThemedText>
                  </PressableButton>
                </View>
                <View className="pt-4">
                  <ThemedText
                    style={{ color: Colors.theme }}
                    bold
                    className="text-2xl"
                  >
                    {duration}
                  </ThemedText>
                </View>
              </View>
              <View
                style={{ backgroundColor: Colors.surface }}
                className="h-36 px-8 py-4 border-1 border-b border-gray-300"
              >
                <ThemedText bold>Comments</ThemedText>
                <ThemedInput
                  onChangeText={setComments}
                  maxLength={maxChars}
                  multiline={true}
                  textAlignVertical="top"
                  className="flex-1 rounded-xl focus:border-amber-500 border border-gray-300"
                >
                  {comments}
                </ThemedInput>
              </View>
            </View>
          </View>
        }
        data={workout.exercise_ids}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex mt-8 mx-6 border border-gray-300 rounded-xl"
          >
            <View className="p-4">
              <ThemedText bold className="text-lg">
                {workout.exercise_names[workout.exercise_ids.indexOf(item)]}
              </ThemedText>
              <View className="flex-row justify-between gap-16 min-h-16">
                <View className="flex-1 flex-row justify-between items-center">
                  <ThemedText>Set</ThemedText>
                  <ThemedText>Weight</ThemedText>
                  <ThemedText>Reps</ThemedText>
                </View>
                <View className="items-center justify-center">
                  <Pressable
                    onPress={() => addSet(item)}
                    className="w-20 h-8 justify-center items-center rounded-xl border border-green-600 active:bg-green-600 bg-green-400"
                  >
                    <ThemedText style={{ color: Colors.surface }}>
                      + SET
                    </ThemedText>
                  </Pressable>
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
            </View>
          </View>
        )}
      ></FlatList>
    </ThemedView>
  );
};

export default CreateWorkoutSession;
