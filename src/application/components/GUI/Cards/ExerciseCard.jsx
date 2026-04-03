import { View } from "react-native";
import { Colors } from "../../../constants/Colors";
import ThemedText from "../../ThemedText";
import PressableButton from "../../PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const ExerciseCard = ({ exercise, ...props }) => {
  return (
    <View
      style={{ backgroundColor: Colors.surface }}
      className="min-h-8 my-4 h-20 border-2 border-gray-200 w-full rounded-[4vw]"
    >
      <View className="flex-1 flex-row justify-between">
        <View className="flex-1 flex-row px-4 items-center">
          <View className="mx-2 w-12 h-12 items-center justify-center bg-gray-200 rounded-[3vw]">
            <Ionicons name="barbell" size={24} color="black" />
          </View>
          <ThemedText bold className="text-start text-lg" numberOfLines={1}>
            {exercise.name}
          </ThemedText>
        </View>
        <View className="flex-1 justify-center px-4 items-end">
          {props.isAdded ? (
            <PressableButton
              onPress={() => props.removeArray(exercise.exercise_id)}
              style={{ backgroundColor: Colors.secondaryButton }}
              className="rounded-[3vw] w-12 h-12"
            >
              <ThemedText bold>✓</ThemedText>
            </PressableButton>
          ) : (
            <PressableButton
              onPress={() => props.appendArray(exercise.exercise_id)}
              style={{ backgroundColor: Colors.secondaryButton }}
              className="rounded-[3vw] w-12 h-12"
            >
              <ThemedText bold>+</ThemedText>
            </PressableButton>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExerciseCard;
