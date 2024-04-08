import { colors } from "constants/colors";
import { fontFamilies } from "constants/fontFamilies";
import { fontSizes } from "constants/fontSizes";
import { measurementConstants } from "constants/measurementConstants";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const BORDER_RADIUS = measurementConstants.buttonRadius;

interface Props {
    icon: string,
    onPress: () => void,
    loading: boolean,
    disabled: boolean,
    color: string,
    fullWidth?: boolean
}

export const BaseButton = (props: Props) => {
    const buttonContainerStyle: any = { ...styles.buttonContainer, backgroundColor: props.color }

    const renderIcon = () => {
        if (props.loading) {
            return <ActivityIndicator color={colors.activityIndicator} />

        } else {
            return <MaterialCommunityIcons name={props.icon} color='white' size={20} />

        }
    }
    if (props.fullWidth) {
        buttonContainerStyle.width = '100%'
    }
    if (props.loading || props.disabled) {
        return (
            <View
                style={[buttonContainerStyle, { opacity: 0.5 }]}>
                {props.loading}
                <View style={styles.iconContainer}>
                    {renderIcon()}
                </View>


            </View>

        )
    }



    return (
        <View style={styles.container}>
            <TouchableOpacity
                hitSlop={{ top: 16, bottom: 4, left: 8, right: 32 }}
                onPress={props.onPress}
                activeOpacity={0.6}
                style={buttonContainerStyle}>
                <View style={styles.iconContainer}>

                    <MaterialCommunityIcons name={props.icon} color='white' size={24} />
                </View>


            </TouchableOpacity>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    iconContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: fontSizes.normal,
        color: 'white',
        fontFamily: fontFamilies.default,
    },
    buttonContainer: {
        backgroundColor: colors.primary,
        paddingTop: 6,
        paddingRight: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        borderRadius: BORDER_RADIUS,
        borderColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: measurementConstants.buttonHeight,


    }

})