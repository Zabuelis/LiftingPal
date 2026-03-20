import { ScrollView, View } from "react-native"
import { Colors } from "../../../constants/Colors"
import ThemedText from "../../ThemedText"
import PressableButton from "../../PressableButton"
import Ionicons from '@expo/vector-icons/Ionicons';

const WorkoutCard = ({ object, style, ...props }) => {
    const displayExercises = object.exercises?.slice(0, 4)
    const hasMore = object.exercises?.length > 5

    return (
        <View style={{ backgroundColor: Colors.surface }} className="rounded-[4vw] h-64 my-4 rounded-[4vw] border-gray-300 border-2">
            <View className="flex-row p-4 items-center justify-between h-20">
                <ThemedText bold className="text-2xl"> { object.name } </ThemedText>
                <View className="flex-row items-center justify-between">
                    <PressableButton className="h-12 mx-2 w-20">
                        <ThemedText bold>Edit</ThemedText>
                    </PressableButton>
                    <PressableButton className="bg-red-400 h-12 w-20">
                        <ThemedText bold>Delete</ThemedText>
                    </PressableButton>
                </View>
            </View>
            <View className="flex-row flex-wrap">
                {
                    displayExercises ? displayExercises.map((exercise, key) => 
                        <View style={{ backgroundColor: Colors.background }} key={key} className="m-2 px-4 justify-center py-2 rounded-[4vw] border-gray-300 border-2">
                            <ThemedText>
                                { exercise }
                            </ThemedText>
                        </View>
                    )
                    : 
                        null
                }
                {
                    hasMore ? 
                        <View style={{ backgroundColor: Colors.background }} className="m-2 px-4 justify-center py-2 rounded-[4vw] border-gray-300 border-2">
                            <ThemedText>
                                +{ object.exercises?.length - 4 }
                            </ThemedText>
                        </View>
                    : 
                        null
                }
            </View>
            {
            // This either needs to be scrollable or limited character.
            object.description ? 
                <View style={{ backgroundColor: Colors.background }} className="m-2 flex-1 px-4 py-2 rounded-[4vw] border-gray-300 border-2">
                    <ThemedText>{ object.description }</ThemedText>
                </View>
                :
                null
            }
            {
                object.exercises ? 
                    <View className="items-end mt-auto pb-2 pr-2">
                        <PressableButton className="flex-row w-1/3 justify-center py-2 px-4">
                            <Ionicons 
                            name="play-outline"
                            size={24}
                            />
                            <ThemedText bold>START</ThemedText>
                        </PressableButton>
                    </View>
                :
                    null
            }
        </View>
    )
}

export default WorkoutCard