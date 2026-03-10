import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../constants/Colors'
import ThemedView from '../components/ThemedView'

const Home = () => {
    return (
        <ThemedView className="flex-1 items-center justify-center">
            <Text className="text-xl font-bold text-blue-500">
                Welcome to Nativewind!
                <Link href="/login">Go to login</Link>
            </Text>
        </ThemedView>
    )
}

export default Home