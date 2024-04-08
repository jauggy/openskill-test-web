import { RobotoCondensed_300Light, RobotoCondensed_400Regular } from '@expo-google-fonts/roboto-condensed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from 'constants/colors';
import { useFonts } from 'expo-font';
import React from 'react';
import { HomeScreen } from 'screens/HomeScreen';
import { MultiMatchScreen } from 'screens/MultiMatchScreen';

const Tab = createMaterialTopTabNavigator();



export default function App() {
    let [fontsLoaded] = useFonts({
        RobotoCondensed_300Light,
        RobotoCondensed_400Regular

    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Tab.Navigator sceneContainerStyle={styles.scene}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12, color: 'white' },
                    tabBarItemStyle: { width: 200 },
                    tabBarStyle: { backgroundColor: colors.topBar },
                    tabBarIndicatorStyle: { backgroundColor: 'white' },
                }}>
                <Tab.Screen name="Single Match" component={HomeScreen} />
                <Tab.Screen name="Multi Match" component={MultiMatchScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = {
    scene: {
        paddingTop: 10,
        backgroundColor: 'white'
    },
    tabContainer: {
        backgroundColor: 'red'
    }
}
