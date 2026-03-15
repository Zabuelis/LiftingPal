import { View } from "react-native"
import ThemedText from '../ThemedText'
import { LinearGradient } from 'expo-linear-gradient'

const AuthenticationLogo = ({ ...props }) => {

    return (
        <LinearGradient
                        colors={['#FFFFFF', '#D4820A']}
                        start={{ x: 0.1, y: 0.1}}
                        end={{x: 0.9, y: 1.5}}
                        style={{ height: 250}}
        >
            <View className="pl-6">
                <View>
                    <ThemedText bold theme className="pt-12 h-32 text-6xl">LiftingPal</ThemedText>
                    <ThemedText bold className="pb-4 text-md opacity-70">TRAINING ASSISTANT</ThemedText>
                </View>
                <View>
                    <ThemedText bold theme className="text-3xl">Build</ThemedText>
                    <ThemedText bold className="text-3xl">strength.</ThemedText>
                    <ThemedText bold theme className="pb-6 text-3xl">Track progress.</ThemedText>
                </View>
            </View>
        </LinearGradient>
    )

}

export default AuthenticationLogo