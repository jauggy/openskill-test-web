import { colors } from "constants/colors";
import { fontFamilies } from "constants/fontFamilies";
import { fontSizes } from "constants/fontSizes";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
/**
 * This button will fill up space
 */
interface Props {

    label: string,
    onPress?: () => void,
    small?: boolean,
    disabled?: boolean
}
export const RLink = (props: Props) => {
    const fontSize = props.small ? fontSizes.small : fontSizes.normal
    const textStyle = [styles.text, { fontSize: fontSize }]
    if (props.disabled) {
        //@ts-ignore
        textStyle.push(styles.disabled)
    }
    const flex = 1
    if (props.onPress && !props.disabled) {
        return (
            <TouchableOpacity onPress={props.onPress} style={{ flex: flex }} hitSlop={{ top: 16, bottom: 4, left: 8, right: 32 }}>
                <Text style={textStyle}>{props.label}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <View style={{ flex: flex }}>
                <Text style={textStyle}>{props.label}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    text: {
        color: colors.primary,
        fontFamily: fontFamilies.default
    },
    disabled: {
        color: 'black'
    }
})