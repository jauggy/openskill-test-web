import { RText } from "components/Typography/RText";
import { colors } from "constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    children: any,
}


export const BottomMessageText = (props: Props) => {
    const insets = useSafeAreaInsets();

    const bottomNotchHeight = insets.bottom / 2


    if (props.children && props.children.length > 0) {
        return (
            <View style={{
                ...styles.container,
            }}>
                <View style={styles.row}>
                    <View style={styles.leftColumn}>
                        <RText>{props.children}</RText>

                    </View>
                    <View style={styles.rightColumn}>
                        <RText color={colors.primary}>OK</RText>

                    </View>
                </View>


                <View style={{ height: bottomNotchHeight }}></View>
            </View>
        )

    } else {
        return null;
    }


}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 15,
        paddingHorizontal: 15,

    },
    row: {
        flexDirection: 'row'
    },
    leftColumn: {
        flex: 1
    },
    rightColumn: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
