import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors'
import { useFonts, DMSans_500Medium, DMSans_800ExtraBold } from '@expo-google-fonts/dm-sans'
import "../global.css"
import { UserProvider } from '../contexts/UserContext';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
    const [loadedFonts] = useFonts({
        DMSans_500Medium,
        DMSans_800ExtraBold
    })

    const isLoggedIn = true


    return (
        <UserProvider>
            <StatusBar style='dark' />
                <Stack screenOptions={{
                    headerStyle: { backgroundColor: Colors.accentTheme}
                }}>
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
                </Stack>
        </UserProvider>
    )
}

export default RootLayout