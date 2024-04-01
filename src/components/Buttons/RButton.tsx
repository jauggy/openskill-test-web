import { RText } from "components/Typography/RText";
import { measurementConstants } from "constants/measurementConstants";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { useSelector } from "react-redux";
import { colors } from "src/constants/colors";
import { buttonState } from "src/globalVars/buttonState";
import { RootState } from "src/reducers/store";


interface Props {
    /**
    * Icons: https://materialdesignicons.com/
    */
    icon: string,
    label: string,
    onPress: () => void,
}
export const RButton = (props: Props) => {
    const isBusy = useSelector((state: RootState) => state.shared.isBusy)
    const uniqueIdRef = useRef(uuid.v4().toString())


    const onPress = () => {
        buttonState.lastPressedId = uniqueIdRef.current;
        props.onPress();
    }
    const showLoading = buttonState.lastPressedId === uniqueIdRef.current && isBusy
    const opacity = isBusy ? 0.5 : 1

    return (
        <View style={{ ...styles.flexContainer, opacity: opacity }}>
            <Button mode="contained" onPress={onPress} disabled={isBusy}
                style={styles.button} contentStyle={styles.contentStyle}
                loading={showLoading} textColor="white"
            >
                <RText color="white">{props.label}</RText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        marginLeft: 15,
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: colors.primary,
        color: 'white',
        minWidth: 0,
        height: measurementConstants.buttonHeight,
        justifyContent: 'center'

    },
    contentStyle: {
        transform: [{ translateY: 2 }],
        color: 'white'
    }


})