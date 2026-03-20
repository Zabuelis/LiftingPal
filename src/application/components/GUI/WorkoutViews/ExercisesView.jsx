import ThemedText from "../../ThemedText";
import ScrollablePage from "../../ScrollablePage";
import PressableButton from "../../PressableButton";
import ThemedInput from "../../ThemedInput";
import { View } from "react-native";
import { Colors } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import WorkoutCard from "../Cards/WorkoutCard";

const ExercisesView = () => {
  const exercises = [
    {
      name: "Rows",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices, mauris sed semper scelerisque, nunc tellus ornare urna, id tincidunt mauris velit quis lectus. Cras dapibus vitae erat sed maximus. Vivamus posuere posuere justo, quis cursus purus pulvinar sed. Donec placerat, velit vel pretium commodo, risus neque egestas metus, id accumsan magna mi vitae urna. Praesent pretium massa mi, id auctor diam imperdiet rhoncus. Mauris congue pharetra erat ornare fermentum. Quisque nec mauris vitae nibh eleifend aliquet eu id augue.",
    },
    {
      name: "Rows",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices, mauris sed semper scelerisque, nunc tellus ornare urna, id tincidunt mauris velit quis lectus. Cras dapibus vitae erat sed maximus. Vivamus posuere posuere justo, quis cursus purus pulvinar sed. Donec placerat, velit vel pretium commodo, risus neque egestas metus, id accumsan magna mi vitae urna. Praesent pretium massa mi, id auctor diam imperdiet rhoncus. Mauris congue pharetra erat ornare fermentum. Quisque nec mauris vitae nibh eleifend aliquet eu id augue.",
    },
    {
      name: "Rows",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices, mauris sed semper scelerisque, nunc tellus ornare urna, id tincidunt mauris velit quis lectus. Cras dapibus vitae erat sed maximus. Vivamus posuere posuere justo, quis cursus purus pulvinar sed. Donec placerat, velit vel pretium commodo, risus neque egestas metus, id accumsan magna mi vitae urna. Praesent pretium massa mi, id auctor diam imperdiet rhoncus. Mauris congue pharetra erat ornare fermentum. Quisque nec mauris vitae nibh eleifend aliquet eu id augue.",
    },
  ];

  return (
    <ScrollablePage safeView={false}>
      <View className="py-6 px-4 flex-row items-center justify-between">
        <ThemedText bold className="text-3xl">
          MY EXERCISES
        </ThemedText>
        <PressableButton className="w-14 h-14">
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
            placeholder="Search exercises..."
            className="w-5/6 h-14 rounded-[4vw]"
          />
        </View>
        {/* Workout cards */}
        {exercises.map((exercise, index) => (
          <WorkoutCard object={exercise} key={index}></WorkoutCard>
        ))}
      </View>
    </ScrollablePage>
  );
};

export default ExercisesView;
