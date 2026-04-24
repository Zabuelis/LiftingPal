import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthenticatedOnly from "../../components/auth/AuthenticatedOnly";
import { WorkoutsProvider } from "../../contexts/WorkoutsContext";
import { WorkoutSessionProvider } from "../../contexts/WorkoutSessionContext";

const DashboardLayout = () => {
  return (
    // Pages accessed by authenticated users only
    <AuthenticatedOnly>
      <WorkoutsProvider>
        <WorkoutSessionProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                paddingTop: 10,
                height: 90,
                backgroundColor: Colors.surface,
              },
              tabBarActiveTintColor: Colors.theme,
              tabBarInactiveTintColor: "gray",
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: "Home",
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="home-outline"
                    size={24}
                    color={focused ? Colors.theme : Colors.passiveTabButton}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="workouts"
              options={{
                title: "Workouts",
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="list-outline"
                    size={24}
                    color={focused ? Colors.theme : Colors.passiveTabButton}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={focused ? Colors.theme : Colors.passiveTabButton}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="forms"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="workoutSession"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="history"
              options={{
                title: "History",
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name="calendar-clear-outline"
                    size={24}
                    color={focused ? Colors.theme : Colors.passiveTabButton}
                  />
                ),
              }}
            />
          </Tabs>
        </WorkoutSessionProvider>
      </WorkoutsProvider>
    </AuthenticatedOnly>
  );
};
export default DashboardLayout;
