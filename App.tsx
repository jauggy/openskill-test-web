import { RobotoCondensed_300Light, RobotoCondensed_400Regular } from '@expo-google-fonts/roboto-condensed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Footer } from 'components/Footer';
import { colors } from 'constants/colors';
import { pathConfig } from 'constants/pathConfig';
import { useFonts } from 'expo-font';
import React from 'react';
import { HomeScreen } from 'screens/HomeScreen';
import { MultiMatchScreen } from 'screens/MultiMatchScreen';

const Tab = createMaterialTopTabNavigator();

function getInitialRouteName() {
    const pathname = window.location.pathname
    if (pathname === pathConfig.MULTI_MATCH) {
        return 'Multi Match'
    }

}

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
            <Tab.Navigator sceneContainerStyle={styles.scene} initialRouteName={getInitialRouteName()}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12, color: 'white' },
                    tabBarItemStyle: { width: 200 },
                    tabBarStyle: { backgroundColor: colors.topBar },
                    tabBarIndicatorStyle: { backgroundColor: 'white' },
                    swipeEnabled: false

                }}>
                <Tab.Screen name="Single Match" component={HomeScreen} />
                <Tab.Screen name="Multi Match" component={MultiMatchScreen} />
            </Tab.Navigator>
            <Footer />
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
