import { View } from "react-native";
import ThemedText from "../../ThemedText";

const ErrorCard = ({ ...props }) => {
  return (
    <View className="bg-red-400 grid min-h-16 border-red-800 border-2 items-center justify-center">
      <ThemedText bold>{props.error}</ThemedText>
    </View>
  );
};

export default ErrorCard;
