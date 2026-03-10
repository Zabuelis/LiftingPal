import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { Colors } from '../constants/Colors'

const ScrollablePage = ({ style, children, ...props }) => {

    return(
        <KeyboardAvoidingView
            style={{ flex:1, backgroundColor: Colors.background }}
            behavior={Platform.OS === "ios" ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow:1 }}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ScrollablePage