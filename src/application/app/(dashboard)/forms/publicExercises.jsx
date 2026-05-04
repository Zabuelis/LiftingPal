import { FlatList, View } from "react-native";
import ThemedView from "../../../components/ThemedView";
import api from "../../../lib/axios";
import { useCallback, useEffect, useState } from "react";
import ThemedText from "../../../components/ThemedText";
import StatusIndicator from "../../../components/StatusIndicator";
import handleErrorResponse from "../../../lib/webErrorMessages";
import ExerciseCard from "../../../components/GUI/Cards/ExerciseCard";
import ErrorCard from "../../../components/GUI/Cards/ErrorCard";
import SuccessCard from "../../../components/GUI/Cards/SuccessCard";
import { Colors } from "../../../constants/Colors";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { useFocusEffect } from "expo-router";

const PublicExercises = () => {
  const { fetchExercises } = useWorkouts();
  const [publicExercises, setPublicExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [webError, setWebError] = useState(null);
  const [webResponse, setWebResponse] = useState(null);

  async function fetchRecords() {
    setIsLoading(true);
    setWebError(null);
    try {
      const response = await api.get("/viewPublicExercise");
      setPublicExercises(response.data.exercises);
    } catch (error) {
      const response = handleErrorResponse(error);
      setWebError(response);
    } finally {
      setIsLoading(false);
    }
  }

  async function addExercise(id) {
    setIsLoading(true);
    setWebError(null);
    setWebResponse(null);
    try {
      const response = await api.post("/addPublicExercise/" + id);
      setWebResponse(response.data.success);
      await fetchExercises();
    } catch (error) {
      const response = handleErrorResponse(error);
      setWebError(response);
    } finally {
      setIsLoading(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchRecords();
      setWebError(null);
      setWebResponse(null);
    }, []),
  );

  if (isLoading) {
    return (
      <ThemedView safe className="flex-1 items-center justify-center">
        <StatusIndicator isLoading={true}></StatusIndicator>
      </ThemedView>
    );
  }

  if (publicExercises.length === 0) {
    return (
      <ThemedView safe className="flex-1 items-center justify-center">
        <ThemedText>There are no public exercises at this time.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView safe>
      <FlatList
        ListHeaderComponent={
          <ThemedView
            style={{ backgroundColor: Colors.surface }}
            className="border-b border-gray-300"
          >
            {webError ? <ErrorCard error={webError}></ErrorCard> : null}
            {webResponse ? (
              <SuccessCard message={webResponse}></SuccessCard>
            ) : null}
            <View className="flex items-center justify-center h-16">
              <ThemedText bold className="text-2xl">
                List of public exercises.
              </ThemedText>
            </View>
          </ThemedView>
        }
        data={publicExercises}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            appendArray={addExercise}
          ></ExerciseCard>
        )}
      ></FlatList>
    </ThemedView>
  );
};

export default PublicExercises;
