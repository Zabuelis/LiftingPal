import { View } from "react-native";
import { Colors } from "../../../constants/Colors";
import ThemedText from "../../ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";

const WorkoutSessionCard = ({ ...props }) => {
  return (
    <View className="my-4">
      <View className="flex-row items-center px-2 gap-2">
        <ThemedText>{props.session.date}</ThemedText>
        <View className="flex-1 h-px bg-gray-500"></View>
      </View>
      <View
        style={{ backgroundColor: Colors.surface }}
        className="min-h-8 h-28 border-2 border-gray-200 w-full rounded-[4vw]"
      >
        <View className="flex-1 flex-row justify-between">
          <View className="flex-1 flex-row items-center gap-1">
            <View className="mx-2 w-12 h-12 items-center justify-center bg-gray-200 rounded-[3vw]">
              <Ionicons name="barbell" size={24} />
            </View>
            <View className="flex-1">
              <ThemedText bold className="text-start text-lg" numberOfLines={1}>
                {props.session.caption}
              </ThemedText>
            </View>
          </View>
          <View className="items-end pr-2 justify-center">
            <ThemedText bold className="text-lg opacity-75">
              {props.session.duration}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkoutSessionCard;
