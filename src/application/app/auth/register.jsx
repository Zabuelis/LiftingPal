import { View, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../../constants/Colors'
import ScrollablePage from '../../components/ScrollablePage'
import ThemedText from '../../components/ThemedText'
import PressableButton from '../../components/ButtonPressable'
import ThemedInput from '../../components/ThemedInput'
import { useUser } from '../../hooks/useUser'


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors] = useState({})

    const { register } = useUser()

    const validateRegister = () => {
        let errors = {}
        if(!email) errors.email = "Email is required."
        if(!name) errors.name = "Name is required."
        if(!password || !password_confirmation) errors.password = "Password is required."
        if(password.length < 8) errors.password = "Password length minimum 8 symbols."
        if(password != password_confirmation) errors.password_confirmation = "Passwords must match."

        setErrors(errors)

        return Object.keys(errors).length === 0;
    }

    async function handleSubmit () {
        if(validateRegister()){
            try {
                await register(name, email, password, password_confirmation)
                console.log("Submitted", name, email, password, password_confirmation)
                setEmail("")
                setName("")
                setPassword("")
                setPasswordConfirmation("")
                setErrors({})
            } catch (error) {
                console.log(error)
            }
            
        }
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
                        <Link href="/">Forgot password?</Link>
                    </ThemedText>
                    <View className="flex items-center">
                        {/* For some reason button component does not apply styles */}
                        <PressableButton onPress={handleSubmit} className="w-full active:bg-amber-600 justify-center items-center h-20 rounded-[5vw] border-gray-300 border-2 bg-amber-500">
                            <ThemedText bold style={{ color: Colors.surface }} className="text-xl">REGISTER</ThemedText>
                        </PressableButton>
                    </View>
            </View>
            <ThemedText className="text-center pt-4 pb-24">
                Already have an accout?
                <Link href="/auth/login" style={{color: Colors.theme}}> Login here.</Link>
            </ThemedText>
        </ScrollablePage>
    )
}

export default Register