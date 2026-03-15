import { TextInput } from "react-native"

const ThemedText = ({ style, bold, theme, ...props }) => {

    return(
        
        <TextInput
            style={[{
                fontFamily: bold ? 'DMSans_800ExtraBold' : 'DMSans_500Medium',
            }, style]} {...props}
        />
    )
}

export default ThemedText