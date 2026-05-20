import ThemedText from "../../components/ThemedText";
import { Colors } from "../../constants/Colors";
import PressableButton from "../../components/PressableButton";
import { useUser } from "../../hooks/useUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import StatusIndicator from "../../components/StatusIndicator";
import api from "../../lib/axios";
import { useWorkoutSessions } from "../../hooks/useWorkoutSessions";
import WorkoutSessionCard from "../../components/GUI/Cards/WorkoutSessionCard";
import ScrollablePage from "../../components/ScrollablePage";
import { BarChart, LineChart } from "react-native-gifted-charts";

const Home = () => {
  const { user } = useUser();
  const { workoutSessions } = useWorkoutSessions();
  const date = new Date();
  const time = date.getHours();
  let timeOfDay = null;
  if (time < 12) {
    timeOfDay = "MORNING";
  } else if (time < 18) {
    timeOfDay = "AFTERNOON";
  } else {
    timeOfDay = "EVENING";
  }
  const [isLoading, setIsLoading] = useState(false);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [totalTime, setTotalTime] = useState("0");
  const [weekTime, setWeekTime] = useState({});
  const [weekTimeDiff, setWeekTimeDiff] = useState(0);

  function handleStart() {
    router.navigate("/workouts");
  }

  async function getTotals() {
    setIsLoading(true);
    try {
      const response = await api.get("/getUserTotals");
      setTotalSets(response.data.total_sets);
      setTotalTime(response.data.total_time);
      setTotalWorkouts(response.data.total_workouts);
    } catch (error) {
      setTotalSets(0);
      setTotalTime("0");
      setTotalWorkouts(0);
    } finally {
      setIsLoading(false);
    }
  }

  async function getTimeDiff() {
    setIsLoading(true);
    try {
      const response = await api.get("/getDailyTime");
      const times = response.data.week_time;
      const daily = response.data.daily_time;
      let timeset = [];
      let dataset = [];
      if (times.length != 0) {
        for (let i = 0; i < times.length; i++) {
          if (times[i].time > 0) {
            timeset.push(parseFloat((times[i].time / 3600).toFixed(2)));
          } else {
            timeset.push(0);
          }
        }
        let diff = NaN;
        if (timeset[0] > 0.1 && timeset[1] > 0.1) {
          diff = (((timeset[1] - timeset[0]) / timeset[1]) * 100).toFixed(1);
        }

        setWeekTimeDiff(diff);
        const weeks = [daily.slice(0, 7), daily.slice(7, 14)];
        const labels = ["M", "T", "W", "T", "F", "S", "S"];
        const minMinutes = 300;
        for (let i = 0; i < weeks.length; i++) {
          dataset.push(
            weeks[i].map((day, j) => ({
              value:
                day.time > minMinutes
                  ? parseFloat((day.time / 3600).toFixed(1))
                  : 0,
              dataPointText:
                day.time > minMinutes ? (day.time / 3600).toFixed(1) : 0,
              label: labels[j],
            })),
          );
        }
        setWeekTime(dataset);
      }
    } catch (error) {
      setWeekTime({});
    } finally {
      setIsLoading(false);
    }
  }

  const recent = () => {
    if (workoutSessions && workoutSessions.data) {
      return workoutSessions.data.slice(0, 3).map((session, i) => (
        <Pressable key={i} onPress={() => router.replace("/history")}>
          <WorkoutSessionCard session={session}></WorkoutSessionCard>
        </Pressable>
      ));
    }
  };

  useEffect(() => {
    getTotals();
    getTimeDiff();
  }, [workoutSessions, user]);

  if (isLoading) {
    return (
      <ThemedText className="flex-1 items-center">
        <StatusIndicator isLoading={true}></StatusIndicator>
      </ThemedText>
    );
  }

  return (
    <ScrollablePage safe className="flex-1">
      <View className="px-3 py-2">
        <ThemedText bold className="text-md">
          GOOD {timeOfDay}
        </ThemedText>
        <ThemedText style={{ color: Colors.text }} bold className="text-3xl">
          {user.name}
        </ThemedText>
      </View>
      <View className="p-4">
        {Object.keys(weekTime).length > 0 ? (
          <View
            style={{ backgroundColor: Colors.surface }}
            height={370}
            className="rounded-xl"
          >
            <View className="flex flex-row justify-between p-4">
              <View className="flex-1">
                <ThemedText bold className="text-xl">
                  Weekly Time Change
                </ThemedText>
              </View>
              {!isNaN(weekTimeDiff) ? (
                <View className="items-end">
                  {weekTimeDiff >= 0 ? (
                    <View
                      style={{ backgroundColor: Colors.background }}
                      className="border flex-1 border-green-500 rounded-xl justify-center items-center w-32"
                    >
                      <ThemedText
                        numberOfLines={1}
                        style={{ color: Colors.accentText }}
                        className="text-xl"
                      >
                        ↑ {weekTimeDiff} %
                      </ThemedText>
                    </View>
                  ) : (
                    <View
                      style={{ backgroundColor: Colors.background }}
                      className="border flex-1 border-red-500 rounded-xl justify-center items-center w-32"
                    >
                      <ThemedText
                        numberOfLines={1}
                        style={{ color: "#ff0000" }}
                        className="text-xl"
                      >
                        ↓ {weekTimeDiff} %
                      </ThemedText>
                    </View>
                  )}
                </View>
              ) : null}
            </View>
            <View
              style={{ backgroundColor: Colors.accentTheme }}
              width={300}
              height={250}
              className="flex-row border rounded-xl border-gray-300 items-center justify-center mt-3 pb-2 mx-12"
            >
              <View className="flex justify-end items-end w-16">
                <ThemedText
                  className="text-center"
                  style={{
                    transform: [{ rotate: "-90deg" }],
                  }}
                >
                  Hours
                </ThemedText>
              </View>
              <LineChart
                height={200}
                maxValue={20}
                data={weekTime[0]}
                data2={weekTime[1]}
                spacing={33}
                hideRules
                dataPointsColor1="#cbd5e1"
                dataPointsColor2={Colors.theme}
                dataPointsRadius={4}
                textShiftY={+8}
                textShiftX={+14}
                textFontSize={13}
                thickness1={2}
                thickness2={3}
                textColor1="#94a3b8"
                color1="#cbd5e1"
                color2={Colors.theme}
                yAxisColor="transparent"
                textColor2={Colors.theme}
                hideYAxisText
              />
            </View>
            <View className="flex-row pt-4 gap-4 items-center justify-center">
              <View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View
                    style={{ backgroundColor: "#94a3b8" }}
                    className="w-8 h-4 rounded-xl"
                  ></View>
                  <ThemedText>Previous Week</ThemedText>
                </View>
              </View>
              <View>
                <View className="flex-row gap-2 items-center justify-center">
                  <View
                    style={{ backgroundColor: Colors.theme }}
                    className="w-8 h-4 rounded-xl"
                  ></View>
                  <ThemedText>Current Week</ThemedText>
                </View>
              </View>
            </View>
          </View>
        ) : null}
        <View className="flex-row my-8 h-32 gap-2">
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex-1 border border-gray-300 rounded-2xl items-center justify-center"
          >
            <ThemedText bold className="text-3xl">
              {totalWorkouts}
            </ThemedText>
            <ThemedText bold className="opacity-70 text-sm">
              WORKOUTS
            </ThemedText>
          </View>
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex-1 border border-gray-300 rounded-2xl items-center justify-center"
          >
            <ThemedText bold className="text-3xl">
              {totalTime}
            </ThemedText>
            <ThemedText bold className="opacity-70 text-sm">
              TOT. HRS.
            </ThemedText>
          </View>
          <View
            style={{ backgroundColor: Colors.surface }}
            className="flex-1 border border-gray-300 rounded-2xl items-center justify-center"
          >
            <ThemedText bold className="text-3xl">
              {totalSets}
            </ThemedText>
            <ThemedText bold className="opacity-70 text-sm">
              SETS
            </ThemedText>
          </View>
        </View>
        <View className="h-20">
          <PressableButton
            onPress={handleStart}
            className="flex-1 flex-row gap-2"
          >
            <Ionicons
              style={{ color: Colors.surface }}
              name="play-outline"
              size={24}
            />
            <ThemedText
              bold
              style={{ color: Colors.surface }}
              className="text-2xl"
            >
              START WORKOUT
            </ThemedText>
          </PressableButton>
        </View>
        <View className="py-6">
          <View className="flex-row justify-between">
            <ThemedText bold className="text-xl">
              Recent
            </ThemedText>
            <ThemedText style={{ color: Colors.theme }} className="text-sm">
              <Link href="/history">{"SEE ALL ->"}</Link>
            </ThemedText>
          </View>
          <View>{recent()}</View>
        </View>
      </View>
    </ScrollablePage>
  );
};
export default Home;
