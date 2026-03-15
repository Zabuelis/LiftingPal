import { Text} from "react-native"
import { Colors } from '../constants/Colors'

const ThemedText = ({ style, bold, theme, ...props }) => {

    return(
        <Text
            style={[{
                fontFamily: bold ? 'DMSans_800ExtraBold' : 'DMSans_500Medium',
                color: theme ? Colors.theme : Colors.text,
            }, style]} {...props}
        />
    )
}

export default ThemedText