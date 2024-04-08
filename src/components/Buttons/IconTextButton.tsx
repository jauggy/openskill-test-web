import { BaseButton } from "components/Buttons/BaseButton";
import { colors } from "constants/colors";
import { fontSizes } from "constants/fontSizes";
import { measurementConstants } from "constants/measurementConstants";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import uuid from 'react-native-uuid';
import { useSelector } from "react-redux";
import { RootState } from "reducers/store";
import { buttonState } from "src/globalVars/buttonState";
/**
 * This button will fill up space
 */
interface Props {
    /**
    * Icons: https://materialdesignicons.com/
    */
    icon?: string,
    label: string,
    onPress: () => void,
    style?: any,
    color?: string,
    fullWidth?: boolean
}
export const IconTextButton = (props: Props) => {
    const isBusy = useSelector((state: RootState) => state.shared.isBusy)
    const [showLoading, setShowLoading] = useState(false);
    const uniqueIdRef = useRef(uuid.v4().toString())
    useEffect(() => {
        if (!isBusy) {
            setShowLoading(false);
        } else if (isBusy && buttonState.lastPressedId === uniqueIdRef.current) {
            setShowLoading(true);
        }
    }, [isBusy])

    const onPress = () => {
        buttonState.lastPressedId = uniqueIdRef.current;
        props.onPress();
    }

    const containerStyle = [{ ...styles.container }, props.style]
    const color = props.color ? props.color : colors.primary
    return (
        <View style={containerStyle}>
            <BaseButton icon={props.icon} onPress={onPress} disabled={isBusy}
                loading={showLoading} label={props.label} color={color} fullWidth={props.fullWidth}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
    },
    content: {
        height: measurementConstants.buttonHeight,
        backgroundColor: colors.primary,
        justifyContent: 'center'

    },
    iconStyle: {
        color: 'white',
        fontSize: fontSizes.buttonIcon
    },
    textStyle: {
        color: 'white',
        fontSize: fontSizes.buttonText
    }
})