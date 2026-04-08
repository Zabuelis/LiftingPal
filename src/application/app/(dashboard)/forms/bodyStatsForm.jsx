import { View } from "react-native";
import ThemedInput from "../../../components/ThemedInput";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { useUser } from "../../../hooks/useUser";
import { useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import PressableButton from "../../../components/PressableButton";
import { router } from "expo-router";
import ErrorCard from "../../../components/GUI/Cards/ErrorCard";
import StatusIndicator from "../../../components/StatusIndicator";

const BodyStatsForm = () => {
  const { user, updateBodyStats } = useUser();
  const [weight, setWeight] = useState(
    user.weight ? user.weight.toString() : "",
  );
  const [height, setHeight] = useState(
    user.height ? user.height.toString() : "",
  );
  const [webError, setWebError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validateForm() {
    let errors = {};
    if (!weight || isNaN(weight)) {
      if (weight < 0) {
        errors.weight = "Weight should be a positive number.";
      } else {
        errors.weight = "Weight field can't be empty/non-numerical.";
      }
    }
    if (!height || isNaN(height)) {
      if (height < 0) {
        errors.weight = "Height should be a positive number.";
      } else {
        errors.height = "Height field can't be empty/non-numerical.";
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    setWebError(null);
    setIsLoading(true);
    try {
      if (validateForm()) {
        await updateBodyStats(height, weight);
        setErrors({});
        router.navigate("/profile");
      }
    } catch (error) {
      setWebError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemedView safe className="flex-1">
      {webError ? <ErrorCard error={webError}></ErrorCard> : null}
      <View className="p-4">
        <View className="pt-4">
          <ThemedText bold className="text-lg">
            HEIGHT
          </ThemedText>
          <ThemedInput
            placeholder="190 (CM)"
            inputMode={"decimal"}
            onChangeText={setHeight}
            style={{ backgroundColor: Colors.surface }}
            value={height}
            className="rounded-[4vw] text-lg focus:border-amber-500 h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.height ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.height}
            </ThemedText>
          ) : null}
        </View>
        <View className="pt-4">
          <ThemedText bold className="text-lg">
            WEIGHT
          </ThemedText>
          <ThemedInput
            placeholder="90 (KG)"
            inputMode={"decimal"}
            onChangeText={setWeight}
            style={{ backgroundColor: Colors.surface }}
            value={weight}
            className="rounded-[4vw] text-lg focus:border-amber-500 h-16 border-gray-300 border-2"
          ></ThemedInput>
          {errors.weight ? (
            <ThemedText
              bold
              style={{ color: Colors.errorText }}
              className="w-full text-left"
            >
              {errors.weight}
            </ThemedText>
          ) : null}
        </View>
        <View className="pt-4 h-24">
          <PressableButton onPress={handleSubmit} className="flex-1">
            <ThemedText
              bold
              style={{ color: Colors.surface }}
              className="text-xl"
            >
              SUBMIT
            </ThemedText>
          </PressableButton>
        </View>
        <StatusIndicator isLoading={isLoading}></StatusIndicator>
      </View>
    </ThemedView>
  );
};

export default BodyStatsForm;
