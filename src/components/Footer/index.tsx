import { RWeakText } from "components/Typography/RWeakText";
import React from "react";
import { StyleSheet, View } from "react-native";

export const Footer = () => {


    return (
        <View style={styles.bottomContainer} pointerEvents="box-none">

            <RWeakText>Created by jauggy with react-native-web</RWeakText>


        </View >

    )


}
const styles = StyleSheet.create({
    bottomContainer: {
        position: 'absolute',

        right: 10,
        bottom: 10,

        justifyContent: 'flex-end',
        overflow: 'hidden'
    },

})
