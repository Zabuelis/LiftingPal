import ThemedText from "../../components/ThemedText";
import { useWorkoutSessions } from "../../hooks/useWorkoutSessions";
import WorkoutSessionCard from "../../components/GUI/Cards/WorkoutSessionCard";
import { FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import ThemedView from "../../components/ThemedView";
import { useCallback, useState } from "react";
import api from "../../lib/axios";
import StatusIndicator from "../../components/StatusIndicator";
import { useRouter } from "expo-router";

const History = () => {
  const { workoutSessions } = useWorkoutSessions();
  const safePadding = useSafeAreaInsets();
  const [workoutSessionsList, setWorkoutSesstionList] = useState(
    workoutSessions.data,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(workoutSessions.last_page);
  const router = useRouter();

  const loadSessions = useCallback(
    async (pageNum, replace = false) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);

      try {
        const response = await api.get(`/viewWorkoutSession?page=${pageNum}`);
        setWorkoutSesstionList(
          replace
            ? response.data.workoutSessions.data
            : [...workoutSessionsList, ...response.data.workoutSessions.data],
        );
        setLastPage(response.data.workoutSessions.last_page);
        setPage(pageNum);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, workoutSessionsList],
  );

  function handleEndReached() {
    if (page < lastPage) {
      loadSessions(page + 1);
    }
  }

  function handleDisplayPage(id) {
    router.push("/workoutSession/" + id);
  }

  return (
    <ThemedView safe>
      <FlatList
        keyExtractor={(item) => item.session_id.toString()}
        contentContainerClassName="px-4"
        data={workoutSessionsList}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        ListFooterComponent={
          isLoading ? (
            <StatusIndicator isLoading={isLoading}></StatusIndicator>
          ) : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <ThemedText bold className="pt-4">
              No sessions yet...
            </ThemedText>
          ) : null
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => handleDisplayPage(item.session_id)}>
            <WorkoutSessionCard session={item}></WorkoutSessionCard>
          </Pressable>
        )}
        ListHeaderComponent={
          <ThemedText bold className="text-3xl">
            HISTORY
          </ThemedText>
        }
      ></FlatList>
    </ThemedView>
  );
};
export default History;
