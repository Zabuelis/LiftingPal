import { Stack } from "expo-router"
import UnauthenticatedOnly from "../../components/auth/UnauthenticatedOnly";

const AuthLayout = () => {
    return (
        <UnauthenticatedOnly>
            <Stack screenOptions={{ headerShown: false }}/>
        </UnauthenticatedOnly>
    )
}

export default AuthLayout