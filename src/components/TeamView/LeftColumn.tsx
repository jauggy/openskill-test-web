import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
    children: any
}

export const LeftColumn = (props: Props) => {


    return (
        <View style={{ ...styles.container }}>
            {props.children}
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        width: 200,
        flexDirection: 'row'
    }
})