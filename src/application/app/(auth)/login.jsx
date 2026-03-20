import { View } from 'react-native'
import { useState } from 'react'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import ScrollablePage from '../../components/ScrollablePage'
import ThemedText from '../../components/ThemedText'
import PressableButton from '../../components/PressableButton'
import ThemedInput from '../../components/ThemedInput'
import StatusIndicator from '../../components/StatusIndicator'
import { useUser } from '../../hooks/useUser'
import AuthenticationLogo from '../../components/GUI/Logos/AuthenticationLogo'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const [webMessageError, setWebMessageError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useUser({})

    function validateLogin() {
        let errors = {}
        if(!email) errors.email = "Email is required."
        if(!password) errors.password = "Password is required."

        setErrors(errors)

        return Object.keys(errors).length === 0
    }

    async function handleSubmit(){
        setWebMessageError(null)
        setIsLoading(true)
        try {
            if(validateLogin()){
            await login(email, password)
            setEmail("")
            setPassword("")
            setErrors({})
        }   
        } catch (error) {
            setWebMessageError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ScrollablePage>
            <AuthenticationLogo></AuthenticationLogo>
            <View className="pt-8 px-6">
                    {
                        webMessageError ? 
                            <ThemedText bold style={{ color: Colors.errorText }} className="text-lg"> 
                                { webMessageError } 
                            </ThemedText> 
                        : 
                            null
                    }
                    <ThemedText className="opacity-65 text-md pb-1">EMAIL ADDRESS</ThemedText>
                    <View className="flex items-center pb-6">
                            <ThemedInput 
                            placeholder='Email'
                            onChangeText={setEmail}
                            value={email}
                            style={{backgroundColor: Colors.surface}} 
                            className="w-full rounded-[4vw] focus:border-amber-500 h-16 border-gray-300 border-2">
                            </ThemedInput>
                            {
                                errors.email ? <ThemedText bold style={{ color: Colors.errorText }} className="w-full text-left"> {errors.email} </ThemedText> : null
                            }
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
                        {
                            errors.password ? <ThemedText bold style={{ color: Colors.errorText }} className="w-full text-left"> {errors.password} </ThemedText> : null
                        }
                    </View>
                    <ThemedText theme className="pb-8 text-right">
                        <Link href="/login">Forgot password?</Link>
                    </ThemedText>
                    <View className="flex items-center">
                        {/* For some reason button component does not apply styles */}
                        <PressableButton onPress={handleSubmit} className="w-full h-20">
                            <ThemedText bold style={{ color: Colors.surface }} className="text-xl">LOG IN</ThemedText>
                        </PressableButton>
                    </View>
                    <StatusIndicator isLoading={isLoading}></StatusIndicator>
            </View>
            <ThemedText className="text-center pt-4">
                No account?
                <Link href="/register" style={{color: Colors.theme}}> Sign up for free now.</Link>
            </ThemedText>
        </ScrollablePage>
    )
}

export default Login