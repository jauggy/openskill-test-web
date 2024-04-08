
import { measurementConstants } from "constants/measurementConstants";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "src/constants/colors";
import { fontSizes } from "src/constants/fontSizes";

interface Props {
    onChangeText: (text) => void,
    value: string,
    placeholder?: string
}
export const RTextInputOutlined = (props: Props) => {

    return (
        <View style={styles.container} >
            <View>
                <TextInput blurOnSubmit={true}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={styles.textInput}
                    placeholder={props.placeholder}
                    keyboardType='ascii-capable'
                    placeholderTextColor={colors.placeholder}
                />

            </View>

        </View>)
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: fontSizes.normal,
        fontFamily: "RobotoCondensed_300Light",
        color: colors.black,
        paddingLeft: 8,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: colors.themeLightGrey,
        borderRadius: 5,
        backgroundColor: 'white',
        height: measurementConstants.buttonHeight
    },
    container: {
        minWidth: 200
    },
    textInputOverlay: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }
})