import { Alert, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import ThemedText from "../../ThemedText";
import PressableButton from "../../PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const WorkoutCard = ({ object, style, ...props }) => {
  // Check how many exercises to display, if it exceeds 3, then add indicator
  const exerciseNames = object.exercise_names ? object.exercise_names : [];
  const displayExercises = exerciseNames.slice(0, 3);
  const hasMore = exerciseNames.length > 3;
  const id = object.exercise_id ? object.exercise_id : object.workout_id;

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
          onPress: () => props.delete(id),
        },
      ],
    );
  }

  function handleEdit() {
    props.edit(id);
  }

  function handleStart() {
    props.start(id);
  }

  return (
    <View
      style={{ backgroundColor: Colors.surface }}
      className="rounded-[4vw] h-64 my-4 rounded-[4vw] border-gray-300 border-2"
    >
      <View className="flex-row p-4 items-center justify-between h-20">
        <ThemedText bold className="text-2xl flex-1" numberOfLines={1}>
          {object.name}
        </ThemedText>
        <View className="flex-row items-center justify-between">
          <PressableButton className="h-12 mx-2 w-20" onPress={handleEdit}>
            <ThemedText style={{ color: Colors.surface }} bold>
              Edit
            </ThemedText>
          </PressableButton>
          <PressableButton
            onPress={handleDelete}
            className="bg-red-400 h-12 w-20"
          >
            <ThemedText style={{ color: Colors.surface }} bold>
              Delete
            </ThemedText>
          </PressableButton>
        </View>
      </View>
      <View className="flex-row flex-wrap">
        {displayExercises.length > 0
          ? displayExercises.map((exercise, key) => (
              <View
                style={{ backgroundColor: Colors.background }}
                key={key}
                className="m-2 px-4 justify-center py-2 rounded-[4vw] border-gray-300 border-2"
              >
                <ThemedText className="w-32 text-center" numberOfLines={1}>
                  {exercise}
                </ThemedText>
              </View>
            ))
          : null}
        {hasMore ? (
          <View
            style={{ backgroundColor: Colors.background }}
            className="m-2 px-4 justify-center py-2 rounded-[4vw] border-gray-300 border-2"
          >
            <ThemedText>+{object.exercise_names?.length - 3}</ThemedText>
          </View>
        ) : null}
      </View>
      {!object.exercise_names ? (
        <View
          style={{ backgroundColor: Colors.background }}
          className="m-2 flex-1 px-4 py-2 rounded-[4vw] border-gray-300 border-2"
        >
          <ThemedText>{object.description}</ThemedText>
        </View>
      ) : null}
      {object.exercise_names ? (
        <View className="items-end mt-auto pb-2 pr-2">
          <PressableButton
            onPress={handleStart}
            className="flex-row w-1/3 justify-center py-2 px-4"
          >
            <Ionicons
              style={{ color: Colors.surface }}
              name="play-outline"
              size={24}
            />
            <ThemedText style={{ color: Colors.surface }} bold>
              START
            </ThemedText>
          </PressableButton>
        </View>
      ) : null}
    </View>
  );
};

export default WorkoutCard;
