import { View } from "react-native";
import ThemedText from "../../ThemedText";

const SuccessCard = ({ ...props }) => {
  return (
    <View className="bg-green-400 h-16 border-green-800 border-2 items-center justify-center">
      <ThemedText bold>{props.message}</ThemedText>
    </View>
  );
};

export default SuccessCard;
