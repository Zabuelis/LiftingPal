import { FlatList } from "react-native";
import ThemedView from "../../../components/ThemedView";
import api from "../../../lib/axios";
import { useState } from "react";
import ThemedText from "../../../components/ThemedText";

const PublicExercises = () => {
  const [publicExercises, setPublicExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [webError, setWebError] = useState(null);

  async function fetchRecords() {
    setIsLoading(true);
    try {
      const response = await api.get("/");
      setPublicExercises(response.exercises);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  if (publicExercises.length < 0) {
    return (
      <ThemedView safe className="flex-1 items-center justify-center">
        <ThemedText>There are no public exercises at this time.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView safe>
      <FlatList></FlatList>
    </ThemedView>
  );
};

export default PublicExercises;
