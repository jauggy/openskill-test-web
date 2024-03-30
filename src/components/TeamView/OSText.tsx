import { RWeakText } from "components/Typography/RWeakText";
import React from "react";
import { StyleSheet } from "react-native";
import { RText } from "src/components/Typography/RText";


interface Props {
    children: number | string
    weak?: boolean
}

export const OSText = (props: Props) => {
    let display = props.children
    if (typeof (props.children) === 'number') {
        display = props.children.toFixed(2)
    }

    if (props.weak) {
        return (

            <RWeakText containerStyle={styles.container}>{display}</RWeakText>
        )
    }

    return (

        <RText containerStyle={styles.container}>{display}</RText>
    )

}
const styles = StyleSheet.create({
    container: {
        width: 84,
    },


})