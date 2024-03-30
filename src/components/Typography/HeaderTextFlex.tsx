import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";


/**
 * Shows header text that fills the screen
 */
interface Props {
    children: string
}
export const HeaderTextFlex = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer} >
                <Headline style={styles.text}>{props.children}</Headline>
            </View>
            <View style={styles.loadingBottom}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    loadingBottom: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        color: 'red'
    }
})