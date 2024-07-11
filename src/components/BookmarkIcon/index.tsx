import Clipboard from '@react-native-clipboard/clipboard';
import { colors } from "constants/colors";
import { fontSizes } from "constants/fontSizes";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { alertUtil } from "util/alertUtil";

function getCustomLink(path: string) {
    const full = location.protocol + '//' + location.host;
    return `${full}${path}`
}

interface Props {
    getPath: () => string
}

export const BookmarkIcon = (props: Props) => {

    const onPress = () => {
        Clipboard.setString(getCustomLink(props.getPath()));

        alertUtil.alert("Bookmark copied to clipboard")
    }


    return (
        <View style={styles.container} pointerEvents="box-none">

            <Pressable onPress={onPress}>
                <Icon name={"bookmark-multiple-outline"} color={colors.default} size={fontSizes.buttonIcon} />

            </Pressable>


        </View >

    )


}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        top: 0,

    },

})
