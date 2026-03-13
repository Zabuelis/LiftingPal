import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import { Colors } from "../../constants/Colors"
import { Link } from "expo-router"
import ButtonPressable from "../../components/ButtonPressable"
import { useUser } from '../../hooks/useUser'
import { useState } from 'react'
import { Text } from "react-native"

const Home = () => {
    const {user, logout} = useUser()
    const [webMessageError, setWebMessageError] = useState(null)
    
    async function handleLogout() {
        setWebMessageError(null)
        try {
           await logout()
        } catch (error) {
            setWebMessageError(error.message)
        }
    }

    return (
        <ThemedView className="flex-1 items-center justify-center">
            <Text className="text-xl font-bold text-blue-500 p-8">Welcome to LiftingPal, 
                {
                    user ? user.name : " Unauthenticated"
                }
            </Text>
            {
                webMessageError ? 
                    <ThemedText bold style={{ color: Colors.errorText }} className="text-lg"> 
                        { webMessageError } 
                    </ThemedText> 
                : 
                    null
            }
            <ButtonPressable onPress={handleLogout} className="w-full active:bg-amber-600 justify-center items-center h-20 rounded-[5vw] border-gray-300 border-2 bg-amber-500">
                <ThemedText bold style={{ color: Colors.surface }} className="text-xl">LOG OUT</ThemedText>
            </ButtonPressable>
        </ThemedView>


    )
}
export default Home