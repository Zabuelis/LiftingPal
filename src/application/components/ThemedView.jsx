import { View } from "react-native";
import { Colors } from "../constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ThemedView = ({ style, safe, ...props }) => {
  const theme = Colors;

  if (!safe) {
    return (
      <View style={[{ backgroundColor: theme.background }, style]} {...props} />
    );
  }

  const safePadding = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: safePadding.top,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedView;
