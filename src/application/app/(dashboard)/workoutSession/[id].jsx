import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useWorkoutSessions } from "../../../hooks/useWorkoutSessions";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import StatusIndicator from "../../../components/StatusIndicator";
import ScrollablePage from "../../../components/ScrollablePage";

const WorkoutSession = () => {
  const { workoutSession, fetchWorkoutSession } = useWorkoutSessions();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchRecord() {
    setIsLoading(true);
    try {
      await fetchWorkoutSession(id);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRecord();
  }, [id]);

  if (!workoutSession || isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText>{id}</ThemedText>
        <StatusIndicator isLoading={true}></StatusIndicator>
      </ThemedView>
    );
  }

  return (
    <ScrollablePage>
      <ThemedText>{workoutSession.caption}</ThemedText>
    </ScrollablePage>
  );
};

export default WorkoutSession;
