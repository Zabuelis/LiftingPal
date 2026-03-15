import { useRouter } from "expo-router"
import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"
import ThemedView from "../ThemedView"
import StatusIndicator from "../StatusIndicator"

const UnauthenticatedOnly = ({ children }) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if(authChecked && user !== null) {
            router.replace('/home')
        } 

    }, [user, authChecked])

    // Loading indicator if authentication has not been checked
    if(!authChecked || user) {
        return (
            <ThemedView className="flex-1 items-center justify-center">
                <StatusIndicator isLoading={true}></StatusIndicator>
            </ThemedView>
        )
    }

    return children
}

export default UnauthenticatedOnly