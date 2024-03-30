import { Spacer } from "components/Spacer";
import { colors } from "constants/colors";
import { fontSizes } from "constants/fontSizes";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
    label?: string,
    onChangeText: (text) => void,

    value: string,
    placeholder?: string

}
export const FormTextInputMulti = (props: Props) => {

    return (
        <View style={styles.container} >
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <View>
                <TextInput
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={styles.textInput}
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.placeholder}
                    multiline
                />

            </View>
            <Spacer small />
        </View>)
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: fontSizes.normal,
        fontFamily: 'RobotoCondensed-Regular',
        color: colors.black,
        paddingLeft: 6,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.themeLightGrey,
        borderRadius: 5,
        backgroundColor: 'white',
        minHeight: 350
    },
    container: {
    },
    label: {
        fontFamily: 'RobotoCondensed-Light',
        paddingBottom: 10
    },
    textInputOverlay: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }
})