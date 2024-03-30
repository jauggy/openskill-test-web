
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";
import { colors } from "src/constants/colors";
import { fontSizes } from "src/constants/fontSizes";

interface Props {
    label?: string,
    onChangeText: (text) => void,
    isIconVisible: boolean,
    icon: string,
    onPressIcon: () => void
    value: string,
    placeholder?: string
}
export const RTextInputOutlined = (props: Props) => {

    return (
        <View style={styles.container} >
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <View>
                <TextInput blurOnSubmit={true}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={styles.textInput}
                    placeholder={props.placeholder}
                    keyboardType='ascii-capable'
                    placeholderTextColor={colors.placeholder}
                />
                {props.isIconVisible &&
                    <View style={styles.textInputOverlay}>
                        <IconButton icon={props.icon} onPress={props.onPressIcon} iconColor={colors.themeDarkGrey} />
                    </View>
                }
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
    },
    container: {
        flex: 1,
        width: '100%'
    },
    label: {
        fontFamily: "RobotoCondensed_300Light",
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