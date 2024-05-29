import { RIconButton } from "components/Buttons/RIconButton";
import { RText } from "components/Typography/RText";
import { RWeakText } from "components/Typography/RWeakText";
import { colors } from "constants/colors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    onValueChanged: (value) => void,
    label: string,
    isChecked: boolean,
    maintainTextColor?: boolean
}
export const RCheckBox = (props: Props) => {


    const onChanged = () => {
        props.onValueChanged(!props.isChecked)
    }

    const renderWeakText = () => {
        if (props.maintainTextColor) {
            return <RText containerStyle={styles.text} >{props.label}</RText>

        } else {
            return <RWeakText containerStyle={styles.text} >{props.label}</RWeakText>

        }
    }

    if (!props.isChecked) {
        return (
            <TouchableOpacity style={styles.container} onPress={onChanged}>
                <RIconButton onPress={onChanged} icon={"checkbox-blank-outline"} size={24} />
                {renderWeakText()}
            </TouchableOpacity>


        )
    } else {
        return (
            <TouchableOpacity style={styles.container} onPress={onChanged}>
                <RIconButton onPress={onChanged} icon={"checkbox-marked"} color={colors.primary} size={24} />
                <RText containerStyle={styles.text}>{props.label}</RText>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
        marginTop: 6,
        marginBottom: 6
    },
    marginRight: {
        marginRight: 8
    },
    text: {
        marginLeft: 6
    }
})
