import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../constants/Colors'
import ThemedView from '../components/ThemedView'
import { useUser } from '../hooks/useUser'
import PressableButton from '../components/ButtonPressable'
import { useState } from 'react'
import ThemedText from '../components/ThemedText'


const Home = () => {
    const { logout, user } = useUser()
    const [ webMessageError, setWebMessageError ] = useState(null)


    async function handleLogout() {
        setWebMessageError(null)
        try {
            await logout()
        } catch (error) {
            setWebMessageError(error)
        }
    }

    return (
        <ThemedView className="flex-1 items-center justify-center">
             {webMessageError ? 
                        <ThemedText bold style={{ color: Colors.errorText }} className="text-lg"> 
                            { webMessageError } 
                        </ThemedText> 
                        : null
                    }
            <Text className="text-xl font-bold text-blue-500">
                Welcome to Lifting pal, 
                { 
                user ? user.name : "Unauthorized" } 
            </Text>
            <Link href="/auth/login" className='text-lg p-20'>Go to login</Link>
            <PressableButton onPress={handleLogout} className="w-full active:bg-amber-600 justify-center items-center h-20 rounded-[5vw] border-gray-300 border-2 bg-amber-500">
                <ThemedText bold style={{ color: Colors.surface }} className="text-xl">LOG OUT</ThemedText>
            </PressableButton>
        </ThemedView>
    )
}

export default Home