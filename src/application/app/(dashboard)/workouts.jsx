import { useWindowDimensions, Text } from "react-native"
import { TabView, TabBar, Tabs } from 'react-native-tab-view'
import { Colors } from "../../constants/Colors";
import WorkoutsView from "../../components/GUI/WorkoutViews/WorkoutsView";
import ThemedView from "../../components/ThemedView"
import * as React from 'react';
import Exercises from "../../components/GUI/WorkoutViews/ExercisesView";

const Workouts = () => {
    const ThemedTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors.theme }}
            style={{ backgroundColor: Colors.surface } }
            activeColor={ Colors.theme }
            inactiveColor={ Colors.text }
        />      
    )

    const routes = [
        { key: 'workout', title: 'Workouts' },
        { key: 'exercise', title: 'Exercises'  }
    ]

    const renderScene = ({ route }) => {
        switch(route.key){
            case 'workout':
                return <WorkoutsView/>
            case 'exercise':
                return <Exercises/>
            default:
                return null
        }
    }

    const layout = useWindowDimensions()
    const [index, setIndex] = React.useState(0)

    return (
        <ThemedView safe className="flex-1">
            <TabView
                renderTabBar={ThemedTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            >
            </TabView>
        </ThemedView>
    )
}

export default Workouts