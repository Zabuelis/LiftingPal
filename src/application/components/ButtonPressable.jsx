import { Pressable} from "react-native"
import { Colors } from '../constants/Colors'

const ButtonPressable = ({ style, ...props }) => {

    return(
        <Pressable
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? Colors.buttonPress : Colors.theme
                },
            style]}{...props}
        />
    )
}

export default ButtonPressable