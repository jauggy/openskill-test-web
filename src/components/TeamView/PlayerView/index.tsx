import React from "react";
import { StyleSheet, View } from "react-native";
import { RText } from "src/components/Typography/RText";
import { fontSizes } from "src/constants/fontSizes";
import { SortedPlayer } from "src/services/types";
import { RankIcon } from "./RankIcon";

interface Props {
    data: SortedPlayer,
    index: number
}

export const PlayerView = (props: Props) => {


    return (
        <View style={{ ...styles.container }}>
            <RankIcon {...props} />
            <RText containerStyle={styles.nameColumn}>{props.data.name}</RText>
            <RText>{props.data.matchRating}</RText>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    text: {
        fontSize: fontSizes.normal,

    },
    nameColumn: {
        width: 200
    }
})