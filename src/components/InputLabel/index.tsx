import { fontFamilies } from "constants/fontFamilies";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    label: string,

}
/**
 * Shows asterix if field is required and empty
 */
export const InputLabel = (props: Props) => {
    const label = props.label


    return (
        <View style={styles.labelRow}>
            <Text style={styles.label}>{label}</Text>
        </View>

    )
}


const styles = StyleSheet.create({

    label: {
        fontFamily: fontFamilies.default
    },
    labelRow: {
        flexDirection: 'row',
        paddingBottom: 10

    },

})