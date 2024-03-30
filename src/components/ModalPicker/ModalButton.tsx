import { RText } from "components/Typography/RText";
import { colors } from "constants/colors";
import { measurementConstants } from "constants/measurementConstants";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const BORDER_RADIUS = measurementConstants.modalButtonBorderRadius

interface Props {
    onPress: () => void,
    label: string
}


export const ModalButton = (props: Props) => {
    return (
        <View style={styles.roundedWhite}>
            <TouchableOpacity onPress={props.onPress} style={styles.bottomButton}>
                <RText systemFont color={colors.primary}>{props.label}</RText>
            </TouchableOpacity>
        </View>
    )



}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        marginBottom: measurementConstants.formComponentMarginBottom

    },
    modalBackground: {
        flex: 1,
        backgroundColor: colors.modalBackground,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    modalContainer: {
        width: '98%',
        borderRadius: BORDER_RADIUS,
        justifyContent: 'flex-end',
        flex: 1,
    },
    roundedWhite: {
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS,
        marginBottom: 4,
        overflow: 'hidden',

    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    header: {
        marginTop: 30,
        marginBottom: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS
    },
    pressableText: {
        marginTop: 20,
        paddingLeft: 20
    },
    flatListContainer: {
        paddingBottom: 40//IOS Hack https://stackoverflow.com/questions/46196242/react-native-flatlist-last-item-visibility-issue
    },
    linkBorder: {
        borderTopWidth: 1,


        borderColor: colors.lineSeperator,

    },
    pressableContainer: {
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    bottomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
        paddingTop: 20,
    }
})