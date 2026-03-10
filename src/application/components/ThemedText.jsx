import { Text} from "react-native"
import { Colors } from '../constants/Colors'

const ThemedView = ({ style, bold, ...props }) => {

    return(
        <Text
            style={[{
                fontFamily: bold ? 'DMSans_700Bold' : 'DMSans_400Regular',
                color: Colors.text,
            }, style]} {...props}
        />
    )
}

export default ThemedView