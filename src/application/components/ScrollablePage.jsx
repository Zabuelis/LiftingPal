import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Colors } from "../constants/Colors";
import ThemedView from "./ThemedView";

const ScrollablePage = ({ style, children, safeView = true, ...props }) => {
  if (safeView) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ThemedView safe style={{ flex: 1 }}>
          <ScrollView>{children}</ScrollView>
        </ThemedView>
      </KeyboardAvoidingView>
    );
  } else if (!safeView) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ThemedView style={{ flex: 1 }}>
          <ScrollView>{children}</ScrollView>
        </ThemedView>
      </KeyboardAvoidingView>
    );
  }
};

export default ScrollablePage;
