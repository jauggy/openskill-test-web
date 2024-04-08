import { fontFamilies } from "constants/fontFamilies";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontSizes } from "src/constants/fontSizes";

interface Props {
    children: any,
    small?: boolean,
    containerStyle?: any
    color?: string,
    systemFont?: boolean
    bold?: boolean
}

export const RText = (props: Props) => {
    const fontFamily = props.systemFont ? null : props.bold ? fontFamilies.strong : fontFamilies.default
    const fontSize = props.small ? fontSizes.small : fontSizes.normal
    const color = props.color ? props.color : 'black'
    const textStyle = [styles.text, { fontSize: fontSize, color: color, fontFamily: fontFamily }]


    return (
        <View style={{ ...styles.container, ...props.containerStyle }}>
            <Text style={textStyle}  >{props.children}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flexShrink: 1 // needed to wrap text
    },
    text: {
        fontSize: fontSizes.normal,

    }
})