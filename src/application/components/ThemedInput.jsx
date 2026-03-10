import { TextInput } from "react-native"

const ThemedText = ({ style, bold, theme, ...props }) => {

    return(
        
        <TextInput
            style={[{
                fontFamily: bold ? 'DMSans_700Bold' : 'DMSans_400Regular',
            }, style]} {...props}
        />
    )
}

export default ThemedText