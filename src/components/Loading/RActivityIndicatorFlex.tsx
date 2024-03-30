import { RActivityIndicator } from "components/Loading/RActivityIndicator";
import React from "react";
import { StyleSheet, View } from "react-native";


/**
 * Loading indicator that fills up screen
 */
interface Props {
    label?: string
}
export const RActivityIndicatorFlex = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer} >
                <RActivityIndicator {...props} />
            </View>
            <View style={styles.loadingBottom}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    loadingBottom: {
        flex: 1
    }
})