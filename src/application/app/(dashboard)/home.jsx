import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import { Colors } from "../../constants/Colors";
import PressableButton from "../../components/PressableButton";
import { useUser } from "../../hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { Link, router } from "expo-router";

const Home = () => {
  const { user } = useUser();
  const date = new Date();
  const time = date.getHours();
  let timeOfDay = null;
  if (time < 12) {
    timeOfDay = "MORNING";
  } else if (time < 18) {
    timeOfDay = "AFTERNOON";
  } else {
    timeOfDay = "EVENING";
  }

  function handleStart() {
    router.navigate("/workouts");
  }

  return (
    <ThemedView safe className="flex-1">
      <View className="px-3 py-2">
        <ThemedText bold className="text-md">
          GOOD {timeOfDay}
        </ThemedText>
        <ThemedText style={{ color: Colors.text }} bold className="text-3xl">
          {user.name}
        </ThemedText>
      </View>
      <View className="p-4">
        <View
          style={{ backgroundColor: Colors.theme }}
          className="h-48 rounded-xl"
        >
          <View className="px-4 flex-1 justify-center gap-2">
            <ThemedText bold style={{ color: Colors.surface }}>
              CURRENT STREAK
            </ThemedText>
            <ThemedText
              bold
              style={{ color: Colors.surface }}
              className="text-7xl"
            >
              14
            </ThemedText>
            <ThemedText bold style={{ color: Colors.surface }}>
              days in a row.
            </ThemedText>
          </View>
        </View>
        <View className="flex-row my-8 h-32 gap-2">
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex-1 border border-gray-300 rounded-2xl items-center justify-center"
          >
            <ThemedText bold className="text-3xl">
              470
            </ThemedText>
            <ThemedText bold className="opacity-70 text-sm">
              WORKOUTS
            </ThemedText>
          </View>
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex-1 border border-gray-300 rounded-2xl items-center justify-center"
          >
            <ThemedText bold className="text-3xl">
              38.2
            </ThemedText>
            <ThemedText bold className="opacity-70 text-sm">
              TOT HRS
            </ThemedText>
          </View>
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex-1 border border-gray-300 rounded-2xl items-center justify-center"
          >
            <ThemedText bold className="text-3xl">
              47
            </ThemedText>
            <ThemedText bold className="opacity-70 text-sm">
              TONS LIFTED
            </ThemedText>
          </View>
        </View>
        <View className="h-20">
          <PressableButton
            onPress={handleStart}
            className="flex-1 flex-row gap-2"
          >
            <Ionicons
              style={{ color: Colors.surface }}
              name="play-outline"
              size={24}
            />
            <ThemedText
              bold
              style={{ color: Colors.surface }}
              className="text-2xl"
            >
              START WORKOUT
            </ThemedText>
          </PressableButton>
        </View>
        <View className="py-6">
          <View className="flex-row justify-between">
            <ThemedText bold className="text-xl">
              Recent
            </ThemedText>
            <ThemedText style={{ color: Colors.theme }} className="text-sm">
              <Link href="/profile">{"SEE ALL ->"}</Link>
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};
export default Home;
