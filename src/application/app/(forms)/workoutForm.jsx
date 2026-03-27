import { Alert, Text, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import { router } from "expo-router";
import PressableButton from "../../components/PressableButton";
import ThemedText from "../../components/ThemedText";
import { Colors } from "../../constants/Colors";

const WorkoutForm = () => {
  function handleReturn() {
    Alert.alert(
      "Return",
      "Are you sure you want to return?\nAll progress will be lost.",
      [
        {
          text: "Cancel",
        },
        {
          text: "Return",
          onPress: ret,
        },
      ],
    );
  }

  function ret() {
    router.replace("/workouts");
  }

  return (
    <ThemedView safe className="flex-1">
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
          NEW EXERCISE
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default WorkoutForm;
