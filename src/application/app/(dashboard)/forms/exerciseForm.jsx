import { Alert, Text, View, BackHandler } from "react-native";
import ThemedView from "../../../components/ThemedView";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import PressableButton from "../../../components/PressableButton";
import ThemedText from "../../../components/ThemedText";
import { Colors } from "../../../constants/Colors";
import ThemedInput from "../../../components/ThemedInput";
import { useCallback, useState } from "react";
import { useWorkouts } from "../../../hooks/useWorkouts";
import StatusIndicator from "../../../components/StatusIndicator";
import SuccessCard from "../../../components/GUI/Cards/SuccessCard";
import ErrorCard from "../../../components/GUI/Cards/ErrorCard";
import filterList from "../../../lib/filterList";

const ExerciseForm = () => {
  const { createExercise, updateExercise, exercises } = useWorkouts();
  const maxChars = 128;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [chars, setChars] = useState(0);
  const [error, setError] = useState("");
  const [webError, setWebError] = useState(null);
  const [webMessage, setWebMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useLocalSearchParams();

  // On focus check wether it is an edit or a create operation
  useFocusEffect(
    useCallback(() => {
      if (id) {
        const exercise = exercises.find(
          (exercise) => exercise.exercise_id === Number(id),
        );
        if (exercise) {
          setIsEdit(true);
          setName(exercise.name);
          setDescription(exercise.description);
        }
      } else {
        setIsEdit(false);
      }
    }, [id]),
  );

  // Dynamically update characters left display
  function handleDescription(text) {
    if (text.length <= maxChars) {
      setDescription(text);
      setChars(text.length);
    }
  }

  function clearFields() {
    setName("");
    setDescription("");
    setError("");
    setChars(0);
  }

  const handleReturn = () => {
    if ((name && name.length > 0) || (description && description.length > 0)) {
      Alert.alert(
        "Return",
        "Are you sure you want to return?\nAll progress will be lost.",
        [
          {
            text: "Cancel",
            onPress: () => null,
          },
          {
            text: "Return",
            onPress: () => ret(),
          },
        ],
      );
      return true;
    } else {
      ret();
    }
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    handleReturn,
  );

  // On every return clear fields
  function ret() {
    clearFields();
    backHandler.remove();
    setWebError(null);
    setWebMessage(null);
    router.navigate("/workouts");
  }

  function isValid() {
    if (!name || name.length === 0) {
      setError("Name is required");
      return false;
    }
    setError(null);
    return true;
  }

  async function submitExercise() {
    setWebError(null);
    setIsLoading(true);
    setWebMessage(null);
    try {
      if (!isEdit) {
        if (isValid()) {
          const message = await createExercise(name, description);
          setWebMessage(message);
          clearFields();
        }
      } else {
        if (isValid()) {
          const message = await updateExercise(id, name, description);
          setWebMessage(message);
          clearFields();
          setIsEdit(false);
        }
      }
    } catch (error) {
      setWebError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemedView safe className="flex-1">
      {webMessage ? <SuccessCard message={webMessage}></SuccessCard> : null}
      {webError ? <ErrorCard error={webError}></ErrorCard> : null}
      <View className="flex-row items-center p-4">
        <PressableButton
          onPress={handleReturn}
          style={{ backgroundColor: Colors.surface }}
          className="w-14 h-14"
        >
          <ThemedText bold className="text-3xl">
            {"<"}
          </ThemedText>
        </PressableButton>
        {isEdit ? (
          <ThemedText bold className="pl-4 text-4xl">
            UPDATE EXERCISE
          </ThemedText>
        ) : (
          <ThemedText bold className="pl-4 text-4xl">
            NEW EXERCISE
          </ThemedText>
        )}
      </View>
      <View className="p-4">
        <ThemedText className="p-1 text-lg opacity-65">
          EXERCISE NAME
        </ThemedText>
        <ThemedInput
          placeholder="Incline dumbell press"
          onChangeText={setName}
          value={name}
          style={{ backgroundColor: Colors.surface }}
          className="rounded-[4vw] text-lg focus:border-amber-500 h-16 border-gray-300 border-2"
        ></ThemedInput>
        {error ? (
          <ThemedText
            bold
            style={{ color: Colors.errorText }}
            className="w-full text-left"
          >
            {error}
          </ThemedText>
        ) : null}
        <ThemedText className="p-1 pt-4 text-lg opacity-65">
          Notes / Cues (optional)
        </ThemedText>
        <View>
          <ThemedInput
            placeholder="Keep your elbows at a 45 degree angle."
            value={description}
            onChangeText={handleDescription}
            style={{ backgroundColor: Colors.surface }}
            textAlignVertical="top"
            maxLength={maxChars}
            multiline={true}
            className="rounded-[4vw] text-lg h-48 focus:border-amber-500 border-gray-300 border-2"
          ></ThemedInput>
          <ThemedText className="text-right">
            {chars}/{maxChars}
          </ThemedText>
        </View>
      </View>
      <View className="pt-4 px-4">
        <PressableButton onPress={submitExercise} className="h-24">
          <ThemedText bold className="text-xl">
            Submit
          </ThemedText>
        </PressableButton>
        <StatusIndicator isLoading={isLoading}></StatusIndicator>
      </View>
    </ThemedView>
  );
};

export default ExerciseForm;
