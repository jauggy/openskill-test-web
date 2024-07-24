import { MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "constants/colors";
import { fontSizes } from "constants/fontSizes";
import { StyleSheet, Text } from 'react-native';
import { Team } from "services/types";
import { OriginalTab } from "./OriginalTab";
import { SplitOneChevsTab } from "./SplitOneChevsTab";



const Tab = createMaterialTopTabNavigator();

const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.primary,
    tabBarLabelStyle: { fontSize: fontSizes.tab, textTransform: 'uppercase' },
    tabBarStyle: { backgroundColor: 'white' },
    tabBarIndicatorStyle: {
        backgroundColor: colors.primary,
    },
    tabBarContentContainerStyle: {
        backgroundColor: 'white'
    },
    swipeEnabled: false

}

function getLabel(focused, color, title) {
    if (focused) {
        return <Text style={styles.activeText}>{title.toUpperCase()}</Text>
    }

    return <Text style={styles.inactiveText}>{title.toUpperCase()}</Text>

}

interface Props {
    teams: Team[]
}

export const TeamTabView = (props: Props) => {

    return (
        <Tab.Navigator screenOptions={screenOptions}  >
            <Tab.Screen options={{
                tabBarLabel: ({ focused, color }) => {
                    return getLabel(focused, color, "Original")
                }
            }} name="Original" children={() => <OriginalTab teams={props.teams} />} />
            <Tab.Screen
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return getLabel(focused, color, "Split One Chevs v2")
                    }
                }}
                name="Split One Chevs v2" children={() => <SplitOneChevsTab teams={props.teams} />} />
        </Tab.Navigator>

    )

}

const styles = StyleSheet.create({
    activeText: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 2,
        color: colors.primary
    },
    inactiveText: {
        color: colors.primary,
        opacity: 0.5
    }
})

