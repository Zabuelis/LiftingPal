import { Text, View } from 'react-native'
import { Slot } from 'expo-router';
import "../global.css"

const RootLayout = () => {
    return(
        <View className="flex-1">
            <Slot />
            <Text>Links</Text>
        </View>
    )
}

export default RootLayout