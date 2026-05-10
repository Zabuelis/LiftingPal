import ThemedText from "../../components/ThemedText";
import { useWorkoutSessions } from "../../hooks/useWorkoutSessions";
import WorkoutSessionCard from "../../components/GUI/Cards/WorkoutSessionCard";
import { FlatList, Pressable, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import { useCallback, useState } from "react";
import api from "../../lib/axios";
import StatusIndicator from "../../components/StatusIndicator";
import { useFocusEffect, useRouter } from "expo-router";
import { ContributionGraph } from "react-native-chart-kit";
import { ChartConfig } from "../../constants/ChartConfig";
import { Colors } from "../../constants/Colors";

const History = () => {
  const { workoutSessions, setWorkoutSessions } = useWorkoutSessions();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(workoutSessions.last_page);
  const router = useRouter();
  const [activity, setActivity] = useState([]);
  const [webMessageError, setWebMessageError] = useState(null);

  const loadSessions = useCallback(
    async (pageNum, replace = false) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);

      try {
        const response = await api.get(`/viewWorkoutSession?page=${pageNum}`);
        if (replace) {
          setWorkoutSessions(response.data.workoutSessions);
        } else {
          setWorkoutSessions((workoutSessions) => ({
            ...workoutSessions,
            data: [
              ...workoutSessions.data,
              ...response.data.workoutSessions.data,
            ],
          }));
        }
        setLastPage(response.data.workoutSessions.last_page);
        setPage(pageNum);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, workoutSessions.data],
  );

  async function getActivity() {
    setWebMessageError(null);
    setIsLoading(true);
    try {
      const response = await api.get("/viewActivity");
      setActivity(response.data.activity);
    } catch (error) {
      setWebMessageError(handleErrorResponse(error));
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getActivity();
    }, []),
  );

  function handleEndReached() {
    if (page < lastPage && !isLoading) {
      loadSessions(page + 1);
    }
  }

  function handleDisplayPage(id) {
    router.push("/workoutSession/" + id + "/preview");
  }

  return (
    <ThemedView safe>
      <FlatList
        keyExtractor={(item) => item.session_id.toString()}
        contentContainerClassName="px-4"
        data={workoutSessions.data}
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
          <Pressable
            key={item.session_id}
            onPress={() => handleDisplayPage(item.session_id)}
          >
            <WorkoutSessionCard session={item}></WorkoutSessionCard>
          </Pressable>
        )}
        ListHeaderComponent={
          <View>
            <ThemedText bold className="text-3xl">
              HISTORY
            </ThemedText>
            <View
              style={{ backgroundColor: Colors.surface }}
              className="pt-4 border h-80 border-gray-300 rounded-xl"
            >
              <ThemedText bold className="mx-4 my-2 text-xl">
                User Activity - Last 90 Days
              </ThemedText>
              {activity && activity.length > 0 ? (
                <View className="flex mx-4 items-center">
                  <ContributionGraph
                    values={activity}
                    endDate={new Date()}
                    numDays={92}
                    chartConfig={ChartConfig}
                    width={340}
                    height={210}
                  />
                </View>
              ) : null}
            </View>
          </View>
        }
      ></FlatList>
    </ThemedView>
  );
};
export default History;
