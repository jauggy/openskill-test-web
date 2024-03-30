import { colors } from "constants/colors";
import { fontFamilies } from "constants/fontFamilies";
import { fontSizes } from "constants/fontSizes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    children: any,
    small?: boolean,
    containerStyle?: any,
    systemFont?: boolean
}

export const RWeakText = (props: Props) => {
    const fontSize = props.small ? fontSizes.small : fontSizes.normal;
    const fontFamily = props.systemFont ? undefined : fontFamilies.default

    let textStyle = [styles.text, { fontSize: fontSize }, { fontFamily: fontFamily }]

    let text = props.children;
    if (typeof props.children === 'number') {
        text = props.children.toLocaleString();
    }



    const containerStyle = [styles.container, props.containerStyle]
    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{text}</Text>
        </View>)

}
const styles = StyleSheet.create({
    container: {
        flexShrink: 1 // needed to wrap text

    },
    text: {
        color: colors.weakText,
    }
})