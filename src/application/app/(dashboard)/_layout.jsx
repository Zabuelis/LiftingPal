import { Tabs } from "expo-router"
import { Colors } from "../../constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthenticatedOnly from "../../components/auth/AuthenticatedOnly";

const DashboardLayout = () => {
    return (
        <AuthenticatedOnly>
            <Tabs
                screenOptions={{ headerShown: false, tabBarStyle: {
                    paddingTop: 10,
                    height: 90,
                    backgroundColor: Colors.surface,
                },
                tabBarActiveTintColor: Colors.theme,
                tabBarInactiveTintColor: "gray"
                }}
            >
                <Tabs.Screen 
                    name="home" 
                    options={{ title: "Home", tabBarIcon: ({ focused }) => (
                        <Ionicons 
                            name="home-outline"
                            size={24}
                            color={focused ? Colors.theme : "gray"}
                        />
                    ) }}/>
                <Tabs.Screen 
                    name="profile" 
                    options={{ title: "Profile", tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="person-outline"
                            size={24}
                            color={focused ? Colors.theme : "gray"}
                        />
                    ) }}/> 
            </Tabs>
        </AuthenticatedOnly>

    )

}
export default DashboardLayout