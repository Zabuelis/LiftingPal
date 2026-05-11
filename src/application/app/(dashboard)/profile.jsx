import { View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useUser } from "../../hooks/useUser";
import ThemedText from "../../components/ThemedText";
import ScrollablePage from "../../components/ScrollablePage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useFocusEffect } from "expo-router";
import PressableButton from "../../components/PressableButton";
import { useCallback, useEffect, useState } from "react";
import StatusIndicator from "../../components/StatusIndicator";
import ErrorCard from "../../components/GUI/Cards/ErrorCard";
import { ContributionGraph } from "react-native-chart-kit";
import api from "../../lib/axios";
import handleErrorResponse from "../../lib/webErrorMessages";
import { ChartConfig } from "../../constants/ChartConfig";
import ThemedView from "../../components/ThemedView";
import { useWorkoutSessions } from "../../hooks/useWorkoutSessions";
import { BarChart } from "react-native-gifted-charts";

const Profile = () => {
  const { user, logout } = useUser();
  const { workoutSessions } = useWorkoutSessions;
  const date = new Date(user.created_at);
  const createdAtYear = date.getFullYear();
  const [webMessageError, setWebMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [volume, setVolume] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [totalLifted, setTotalLifted] = useState(0);

  async function handleLogout() {
    setWebMessageError(null);
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      setWebMessageError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function computeBMI() {
    if (user.height && user.weight && user.height > 0 && user.weight > 0) {
      let normalizedHeight = (user.height / 100).toFixed(1);
      let bmi = (user.weight / (normalizedHeight * normalizedHeight)).toFixed(
        1,
      );
      setBmi(bmi);
    }
  }

  async function fetchWeeklyVolume() {
    setIsLoading(true);
    try {
      const response = await api.get("/getWeeklyVolume");
      const volumeData = response.data.weekly_volume;
      setVolume(volumeData);
      let week = 1;
      let data = [];
      let total = 0;
      for (let i = 0; i < volumeData.length; i++) {
        data.push({ value: volumeData[i].volume, label: "W" + week });
        total += volumeData[i].volume;
        week++;
      }
      setDataset(data);
      setTotalLifted(total);
    } catch (error) {
      setVolume([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    computeBMI();
  }, [user.weight, user.height]);

  useEffect(() => {
    fetchWeeklyVolume();
  }, [workoutSessions, user]);

  if (isLoading) {
    return (
      <ThemedView className="flex-1">
        <StatusIndicator isLoading={true}></StatusIndicator>
      </ThemedView>
    );
  }

  return (
    <ScrollablePage>
      {webMessageError ? <ErrorCard error={webMessageError}></ErrorCard> : null}
      <View
        style={{ backgroundColor: Colors.theme }}
        className="h-40 items-center justify-center gap-2"
      >
        <ThemedText style={{ color: Colors.surface }} bold className="text-3xl">
          {user.name.toUpperCase()}
        </ThemedText>
        <View className="p-2 bg-amber-500/30 rounded-2xl">
          <ThemedText bold style={{ color: Colors.surface }}>
            MEMBER SINCE {createdAtYear}
          </ThemedText>
        </View>
      </View>
      <View className="px-4 pt-8">
        <View>
          <View className="flex-row pb-4 flex-1 justify-between">
            <ThemedText bold className="text-xl">
              Body Stats
            </ThemedText>
            <ThemedText style={{ color: Colors.theme }}>
              <Link href="/forms/bodyStatsForm">{"EDIT ->"}</Link>
            </ThemedText>
          </View>
          <View className="flex-1 flex-row gap-2 h-20">
            <View
              style={{ backgroundColor: Colors.surface }}
              className="flex-1 items-center justify-center gap-1 rounded-3xl border border-gray-300"
            >
              <View className="flex-row gap-2">
                <View className="justify-center">
                  <Ionicons name="scale-outline" size={32} color="black" />
                </View>
                <View>
                  <ThemedText className="opacity-60">WEIGHT</ThemedText>
                  {user.weight ? (
                    <View className="flex-row gap-1 items-baseline">
                      <ThemedText bold className="text-xl">
                        {user.weight}
                      </ThemedText>
                      <ThemedText className="opacity-60">KG</ThemedText>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
            <View
              style={{ backgroundColor: Colors.surface }}
              className="flex-1 items-center justify-center gap-1 rounded-3xl border border-gray-300"
            >
              <View className="flex-row gap-2">
                <View className="justify-center">
                  <Ionicons
                    name="arrow-up-circle-outline"
                    size={32}
                    color="black"
                  />
                </View>
                <View>
                  <ThemedText className="opacity-60">HEIGHT</ThemedText>
                  {user.height ? (
                    <View className="flex-row gap-1 items-baseline">
                      <ThemedText bold className="text-xl">
                        {user.height}
                      </ThemedText>
                      <ThemedText className="opacity-60">CM</ThemedText>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
          <View className="mt-4 flex-1 h-20">
            <View
              style={{ backgroundColor: Colors.surface }}
              className="flex-1 items-center justify-center gap-1 rounded-3xl border border-gray-300"
            >
              <View className="flex-row gap-3">
                <View className="justify-center">
                  <Ionicons
                    name="stats-chart-outline"
                    size={32}
                    color="black"
                  />
                </View>
                <View>
                  <ThemedText className="opacity-60">BMI</ThemedText>
                  <ThemedText bold className="text-xl">
                    {bmi}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
          {volume.length === 4 ? (
            <View
              style={{ backgroundColor: Colors.surface }}
              height={340}
              className="mt-4 border border-gray-300 rounded-xl"
            >
              <View className="p-4 flex-row justify-between">
                <View>
                  <ThemedText className="text-xl" bold>
                    Monthly Volume
                  </ThemedText>
                  <ThemedText>Weekly KG Lifted</ThemedText>
                </View>
                <View
                  style={{ backgroundColor: Colors.background }}
                  className="flex items-center justify-center w-28 rounded-xl border border-gray-300"
                >
                  <ThemedText className="text-lg" numberOfLines={1} bold>
                    {totalLifted} KG
                  </ThemedText>
                </View>
              </View>
              <View className="pl-4 pt-4">
                <BarChart
                  data={dataset}
                  width={300}
                  barWidth={50}
                  frontColor={Colors.theme}
                  noOfSections={3}
                  hideRules
                />
              </View>
            </View>
          ) : null}
          <View className="py-8">
            <PressableButton onPress={handleLogout} className="w-full h-20">
              <ThemedText
                bold
                style={{ color: Colors.surface }}
                className="text-xl"
              >
                LOG OUT
              </ThemedText>
            </PressableButton>
            <StatusIndicator isLoading={isLoading}></StatusIndicator>
          </View>
        </View>
      </View>
    </ScrollablePage>
  );
};

export default Profile;
