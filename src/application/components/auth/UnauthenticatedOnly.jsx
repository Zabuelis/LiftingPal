import { useRouter } from "expo-router"
import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"
import { Text } from "react-native"
import ThemedView from "../ThemedView"

const UnauthenticatedOnly = ({ children }) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if(authChecked && user !== null) {
            router.replace('/home')
        } 

    }, [user, authChecked])

    if(!authChecked || user) {
        return (
            <ThemedView className="flex-1"></ThemedView>
        )
    }

    return children
}

export default UnauthenticatedOnly