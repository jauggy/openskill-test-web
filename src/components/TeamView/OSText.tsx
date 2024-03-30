import React from "react";
import { StyleSheet } from "react-native";
import { RText } from "src/components/Typography/RText";


interface Props {
    children: number | string
}

export const OSText = (props: Props) => {
    let display = props.children
    if (typeof (props.children) === 'number') {
        display = props.children.toFixed(2)
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