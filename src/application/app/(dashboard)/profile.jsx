import { View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useUser } from "../../hooks/useUser";
import ThemedText from "../../components/ThemedText";
import ScrollablePage from "../../components/ScrollablePage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import PressableButton from "../../components/PressableButton";
import { useState } from "react";
import StatusIndicator from "../../components/StatusIndicator";
import ErrorCard from "../../components/GUI/Cards/ErrorCard";

const Profile = () => {
  const { user, logout } = useUser();
  const date = new Date(user.created_at);
  const createdAtYear = date.getFullYear();
  const [webMessageError, setWebMessageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        <ThemedText
          bold
          style={{ color: Colors.surface }}
          className="opacity-70"
        >
          MEMBER SINCE {createdAtYear}
        </ThemedText>
        <View className="p-2 bg-amber-500/30 rounded-2xl">
          <ThemedText bold style={{ color: Colors.surface }}>
            14 DAY STREAK
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
          <View className="mt-4 flex-1 flex-row gap-2 h-20">
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
                </View>
              </View>
            </View>
            <View
              style={{ backgroundColor: Colors.surface }}
              className="flex-1 items-center justify-center gap-1 rounded-3xl border border-gray-300"
            >
              <ThemedText>Some Additional Indicator</ThemedText>
            </View>
          </View>
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
