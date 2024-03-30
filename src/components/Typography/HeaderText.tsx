import { colors } from "constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from 'react-native-paper';

interface Props {
    children: any,
    color?: string
}

export const HeaderText = (props: Props) => {
    return (<View style={styles.container}>
        <Headline style={[styles.text, { color: props.color }]}>{props.children}</Headline>
    </View>)

}
const styles = StyleSheet.create({
    container: {
    },
    text: {
        textAlign: 'center',
        color: colors.text
    }
})