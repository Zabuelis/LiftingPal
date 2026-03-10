import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors'
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import "../global.css"

const RootLayout = () => {
    const [loadedFonts] = useFonts({
        DMSans_400Regular,
        DMSans_700Bold
    })
    return(
        <Stack screenOptions={{
            headerStyle: { backgroundColor: Colors.accentTheme}
        }}>
            <Stack.Screen name="index" options={{ title: 'Home' }}></Stack.Screen>
            <Stack.Screen name="login" options={{title: 'Login'}}></Stack.Screen>
            <Stack.Screen name="register" options={{title: 'Register'}}></Stack.Screen>
        </Stack>
    )
}

export default RootLayout