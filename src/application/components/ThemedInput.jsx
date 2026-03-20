import { TextInput } from "react-native";

const ThemedInput = ({ style, bold, theme, ...props }) => {
  return (
    <TextInput
      style={[
        {
          fontFamily: bold ? "DMSans_800ExtraBold" : "DMSans_500Medium",
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedInput;
