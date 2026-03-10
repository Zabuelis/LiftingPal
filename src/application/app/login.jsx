import { Button, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../constants/Colors'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'

const Login = () => {
    return (
        <ThemedView>
            <LinearGradient
                colors={['#FFFFFF', '#D4820A']}
                start={{ x: 0.1, y: 0.1}}
                end={{x: 0.9, y: 1.5}}
                style={{ height: 250}}
            >
                <View className="pl-6">
                    <View>
                        <ThemedText bold style={{ color: Colors.theme}} className="pt-12 pb-1 text-4xl">LiftingPal</ThemedText>
                        <ThemedText style={{ color: Colors.text}} className="pb-8 text-md opacity-90">TRAINING ASSISTANT</ThemedText>
                    </View>
                    <View>
                        <ThemedText bold style={{ color: Colors.theme}} className="text-2xl">Build</ThemedText>
                        <ThemedText bold style={{ color: Colors.text}} className="text-2xl">strength.</ThemedText>
                        <ThemedText bold style={{ color: Colors.theme}} className="pb-6 text-2xl">Track progress.</ThemedText>
                    </View>
                </View>
            </LinearGradient>
            <View className="pt-8 px-6">
                <ThemedText style={{ color: Colors.text }} className="opacity-65 text-md pb-1">EMAIL ADDRESS</ThemedText>
                <View className="flex items-center pb-6">
                    <TextInput 
                    placeholder='email@example.com'
                    style={{backgroundColor: Colors.surface}} 
                    className="w-full rounded-xl h-14 border-gray-300 border-2"></TextInput>
                </View>
                <ThemedText style={{ color: Colors.text }} className="opacity-65 text-md pb-1">PASSWORD</ThemedText>
                <View className="flex items-center pb-6">
                    <TextInput 
                    placeholder='********'
                    secureTextEntry={true}
                    style={{backgroundColor: Colors.surface}} 
                    className="w-full rounded-xl h-14 border-gray-300 border-2"></TextInput>
                </View>
                <ThemedText style={{ color: Colors.theme }} className="text-right">Forgot password?</ThemedText>
            </View>
        </ThemedView>
    )
}

export default Login