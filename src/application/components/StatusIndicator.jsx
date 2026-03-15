import { ActivityIndicator } from "react-native"
import { Colors } from "../constants/Colors"


const StatusIndicator = ({isLoading = false, children, ...props}) => {
    if(isLoading){
        return (
            <ActivityIndicator size="large" color={Colors.theme} className="p-4"/>
        )
    } else {
        return (
            children
        )
    }
}

export default StatusIndicator