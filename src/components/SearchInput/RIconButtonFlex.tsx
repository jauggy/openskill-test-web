import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { colors } from "src/constants/colors";
import { fontSizes } from "src/constants/fontSizes";
import { buttonState } from "src/globalVars/buttonState";
import { RootState } from "src/reducers/store";


interface Props {
    /**
    * Icons: https://materialdesignicons.com/
    */
    icon: string,
    label?: string,
    onPress: () => void,
}
export const RIconButtonFlex = (props: Props) => {
    const isBusy = useSelector((state: RootState) => state.shared.isBusy)
    const uniqueIdRef = useRef(uuid.v4().toString())


    const onPress = () => {
        buttonState.lastPressedId = uniqueIdRef.current;
        props.onPress();
    }

    const opacity = isBusy ? 0.5 : 1

    return (
        <View style={{ ...styles.flexContainer, opacity: opacity }}>
            <Button mode="contained" onPress={onPress} disabled={isBusy}
                style={styles.button} contentStyle={styles.contentStyle}
            >
                <Icon name={props.icon} color='white' size={fontSizes.buttonIcon} />


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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 0

    },
    contentStyle: {
        flex: 1,
        transform: [{ translateY: 2 }]
    }


})