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
import ThemedInput from "../../../../components/ThemedInput";
import SuccessCard from "../../../../components/GUI/Cards/SuccessCard";

const WorkoutSession = () => {
  const {
    workoutSession,
    fetchWorkoutSession,
    deleteWorkoutSession,
    updateWorkoutSession,
  } = useWorkoutSessions();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [webError, setWebError] = useState(null);
  const [webResponse, setWebResponse] = useState(null);
  const [caption, setCaption] = useState("");
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState({});
  const maxChars = 128;

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

  useEffect(() => {
    if (workoutSession) {
      setCaption(workoutSession.caption);
      setComments(workoutSession.comments);
    }
  }, [workoutSession]);

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

  function clearFields() {
    setWebError(null);
    setWebResponse(null);
    setErrors({});
  }

  async function deleteRecord() {
    setIsLoading(true);
    clearFields();
    try {
      const response = await deleteWorkoutSession(id);
      router.navigate("/history");
    } catch (error) {
      setWebError(error.message);
    }
  }

  function validFields() {
    let errors = {};
    if (!caption) {
      errors.caption = "Caption can't be empty.";
    } else if (caption.length > maxChars) {
      errors.caption = "Caption length is limted to 128 symbols.";
    }
    if (comments.length > maxChars) {
      errors.comments = "Comments length is limited to 128 symbols.";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function updateRecord() {
    setIsLoading(true);
    clearFields();
    try {
      if (validFields()) {
        const response = await updateWorkoutSession(id, caption, comments);
        setWebResponse(response);
        workoutSession.caption = caption;
        workoutSession.comments = comments;
      }
    } catch (error) {
      setWebError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemedView safe>
      <FlatList
        stickyHeaderIndices={[0]}
        data={zippedExercises}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: Colors.surface }}
            className="h-24 mx-4 mt-4 p-4 border-1 border-gray-300 items-center flex-row"
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
          <View>
            {webResponse ? (
              <SuccessCard message={webResponse}></SuccessCard>
            ) : null}
            {Object.keys(errors).length !== 0 ? (
              <View className="bg-red-400 min-h-16 border-red-800 border-2 items-center justify-center">
                {Object.keys(errors).map((key) => (
                  <ThemedText key={key} bold>
                    {errors[key]}
                  </ThemedText>
                ))}
              </View>
            ) : null}
            <View>
              <View
                style={{ backgroundColor: Colors.surface }}
                className="h-40 px-8 border-1 border-b border-gray-300"
              >
                <View className="flex-row justify-between gap-8 items-center py-4">
                  <ThemedInput
                    onChangeText={setCaption}
                    maxLength={maxChars}
                    className="flex-1 h-14 font-bold text-xl rounded-xl focus:border-amber-500 border border-gray-300"
                  >
                    {caption}
                  </ThemedInput>
                  <View className="flex-row gap-3">
                    <PressableButton
                      onPress={handleDelete}
                      className="h-10 w-20 bg-red-400"
                    >
                      <ThemedText style={{ color: Colors.surface }} bold>
                        Delete
                      </ThemedText>
                    </PressableButton>
                    {caption !== workoutSession.caption ||
                    comments !== workoutSession.comments ? (
                      <PressableButton
                        onPress={updateRecord}
                        className="h-10 w-20 bg-green-400"
                      >
                        <ThemedText style={{ color: Colors.surface }} bold>
                          Update
                        </ThemedText>
                      </PressableButton>
                    ) : null}
                  </View>
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

            <View
              style={{ backgroundColor: Colors.surface }}
              className="h-24 px-8 p-4 border-1 border-gray-300 items-center flex-row"
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
          </View>
        }
      ></FlatList>
    </ThemedView>
  );
};

export default WorkoutSession;
