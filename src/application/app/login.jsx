import { View, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../constants/Colors'
import ScrollablePage from '../components/ScrollablePage'
import ThemedText from '../components/ThemedText'
import PressableButton from '../components/ButtonPressable'
import ThemedInput from '../components/ThemedInput'
import { useUser } from '../hooks/useUser'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useUser()

    function handleSubmit(){
        // if(email != '' || password != '' ||){

        // }
        console.log("Current user: ", user)
        console.log("Login form", email, password)
    }

    return (
        <ScrollablePage>
            <LinearGradient
                colors={['#FFFFFF', '#D4820A']}
                start={{ x: 0.1, y: 0.1}}
                end={{x: 0.9, y: 1.5}}
                style={{ height: 250}}
            >
                <View className="pl-6">
                    <View>
                        <ThemedText bold theme className="pt-12 pb-1 text-4xl">LiftingPal</ThemedText>
                        <ThemedText className="pb-8 text-md opacity-90">TRAINING ASSISTANT</ThemedText>
                    </View>
                    <View>
                        <ThemedText bold theme className="text-2xl">Build</ThemedText>
                        <ThemedText bold className="text-2xl">strength.</ThemedText>
                        <ThemedText bold theme className="pb-6 text-2xl">Track progress.</ThemedText>
                    </View>
                </View>
            </LinearGradient>
            <View className="pt-8 px-6">
                    <ThemedText className="opacity-65 text-md pb-1">EMAIL ADDRESS</ThemedText>
                    <View className="flex items-center pb-6">
                            <ThemedInput 
                            placeholder='Email'
                            onChangeText={setEmail}
                            value={email}
                            style={{backgroundColor: Colors.surface}} 
                            className="w-full rounded-[4vw] focus:border-amber-500 h-16 border-gray-300 border-2">
                            </ThemedInput>
                    </View>
                    <ThemedText className="opacity-65 text-md pb-1">PASSWORD</ThemedText>
                    <View className="flex items-center pb-2">
                        <ThemedInput 
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        style={{backgroundColor: Colors.surface}} 
                        className="w-full focus:border-amber-500 rounded-[4vw] h-16 border-gray-300 border-2">
                        </ThemedInput>
                    </View>
                    <ThemedText theme className="pb-8 text-right">
                        <Link href="/">Forgot password?</Link>
                    </ThemedText>
                    <View className="flex items-center">
                        {/* For some reason button component does not apply styles */}
                        <PressableButton onPress={handleSubmit} className="w-full active:bg-amber-600 justify-center items-center h-20 rounded-[5vw] border-gray-300 border-2 bg-amber-500">
                            <ThemedText bold style={{ color: Colors.surface }} className="text-xl">LOG IN</ThemedText>
                        </PressableButton>
                    </View>
            </View>
            <ThemedText className="text-center pt-4">
                No account?
                <Link href="/register" style={{color: Colors.theme}}> Sign up for free now.</Link>
            </ThemedText>
        </ScrollablePage>
    )
}

export default Login