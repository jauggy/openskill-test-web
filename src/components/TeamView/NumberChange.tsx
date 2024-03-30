import { colors } from "constants/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { RText } from "src/components/Typography/RText";


interface Props {
    children: number
}

export const NumberChange = (props: Props) => {
    let display = props.children.toFixed(2)

    if (props.children < 0) {
        return (

            <RText color={colors.error} containerStyle={styles.container}>{display}</RText>
        )
    }

    return (

        <RText color={colors.success} containerStyle={styles.container}>+{display}</RText>
    )



}
const styles = StyleSheet.create({
    container: {
        width: 84,
    },


})