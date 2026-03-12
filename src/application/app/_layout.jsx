import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors'
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import "../global.css"
import { UserProvider } from '../contexts/UserContext';

const RootLayout = () => {
    const [loadedFonts] = useFonts({
        DMSans_400Regular,
        DMSans_700Bold
    })

    const isLoggedIn = true


    return(
        <UserProvider>
            <Stack screenOptions={{
                headerStyle: { backgroundColor: Colors.accentTheme}
            }}>
                {/* <Stack.Protected guard={isLoggedIn}> */}
                    <Stack.Screen name="index" options={{ title: 'Home' }}></Stack.Screen>
                    <Stack.Screen name="auth/login" options={{title: 'Login'}}></Stack.Screen>
                    <Stack.Screen name="auth/register" options={{title: 'Register'}}></Stack.Screen>
                {/* </Stack.Protected> */}
                {/* <Stack.Protected guard={isLoggedIn}> */}
                    
                {/* </Stack.Protected> */}
            </Stack>
        </UserProvider>
    )
}

export default RootLayout