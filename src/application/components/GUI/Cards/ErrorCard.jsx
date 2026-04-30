import { View } from "react-native";
import ThemedText from "../../ThemedText";

const ErrorCard = ({ error }) => {
  return (
    <View className="bg-red-400 min-h-16 border-red-800 border-2 items-center justify-center">
      {Object.keys(error).map((key) => (
        <ThemedText key={key} bold>
          {error[key]}
        </ThemedText>
      ))}
    </View>
  );
};

export default ErrorCard;
