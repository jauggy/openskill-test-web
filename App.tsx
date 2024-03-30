import { RobotoCondensed_300Light, RobotoCondensed_400Regular } from '@expo-google-fonts/roboto-condensed';
import { useFonts } from 'expo-font';
import React from 'react';
import { HomeScreen } from 'screens/HomeScreen';




export default function App() {
    let [fontsLoaded] = useFonts({
        RobotoCondensed_300Light,
        RobotoCondensed_400Regular

    });

    if (!fontsLoaded) {
        return null;
    }

    return <HomeScreen />
}
