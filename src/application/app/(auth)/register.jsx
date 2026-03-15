import { View } from 'react-native'
import { useState } from 'react'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import ScrollablePage from '../../components/ScrollablePage'
import ThemedText from '../../components/ThemedText'
import PressableButton from '../../components/PressableButton'
import ThemedInput from '../../components/ThemedInput'
import StatusIndicator from '../../components/StatusIndicator'
import AuthenticationLogo from '../../components/GUI/AuthenticationLogo'
import { useUser } from '../../hooks/useUser'


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors] = useState({})

    const {register} = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const [webMessageError, setWebMessageError] = useState(null)

    const validateRegister = () => {
        let errors = {}
        if(!email) errors.email = "Email is required."
        if(!name) errors.name = "Name is required."
        if(!password || !password_confirmation) errors.password = "Password is required."
        if(password.length < 8) errors.password = "Password length required: minimum 8 symbols."
        if(password != password_confirmation) errors.password_confirmation = "Passwords must match."

        setErrors(errors)

        return Object.keys(errors).length === 0;
    }

    async function handleSubmit () {
        setWebMessageError(null)
        setIsLoading(true)
        try {
            if(validateRegister()){
                await register(name, email, password, password_confirmation)
                setEmail("")
                setName("")
                setPassword("")
                setPasswordConfirmation("")
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
                    <ThemedText className="opacity-65 text-md pb-1">NAME</ThemedText>
                    <View className="flex items-center pb-6">
                        <ThemedInput 
                        placeholder='Name'
                        onChangeText={setName}
                        value={name}
                        style={{backgroundColor: Colors.surface}} 
                        className="w-full rounded-[4vw] focus:border-amber-500 h-16 border-gray-300 border-2">
                        </ThemedInput>
                        {
                            errors.name ? <ThemedText bold style={{ color: Colors.errorText }} className="w-full text-left"> {errors.name} </ThemedText> : null
                        }
                    </View>
                    <ThemedText className="opacity-65 text-md pb-1">PASSWORD</ThemedText>
                    <View className="flex items-center pb-6">
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
                    <ThemedText className="opacity-65 text-md pb-1">REPEAT PASSWORD</ThemedText>
                    <View className="flex items-center pb-6">
                        <ThemedInput 
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={setPasswordConfirmation}
                        value={password_confirmation}
                        style={{backgroundColor: Colors.surface}} 
                        className="w-full focus:border-amber-500 rounded-[4vw] h-16 border-gray-300 border-2">
                        </ThemedInput>
                        {
                            errors.password_confirmation ? <ThemedText bold style={{ color: Colors.errorText }} className="w-full text-left"> {errors.password_confirmation} </ThemedText> : null
                        }
                    </View>
                    <ThemedText theme className="pb-4 text-right">
                        <Link href="/register">Forgot password?</Link>
                    </ThemedText>
                    <View className="flex items-center">
                        {/* For some reason button component does not apply styles */}
                        <PressableButton onPress={handleSubmit} className="w-full h-20">
                            <ThemedText bold style={{ color: Colors.surface }} className="text-xl">REGISTER</ThemedText>
                        </PressableButton>
                        <StatusIndicator isLoading={isLoading}></StatusIndicator>
                    </View>
            </View>
            <ThemedText className="text-center pt-4 pb-8">
                Already have an accout?
                <Link href="/login" style={{color: Colors.theme}}> Login here.</Link>
            </ThemedText>
        </ScrollablePage>
    )
}

export default Register