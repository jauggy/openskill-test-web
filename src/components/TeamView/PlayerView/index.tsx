import React from "react";
import { StyleSheet, View } from "react-native";
import { Player } from "services/types";
import { RText } from "src/components/Typography/RText";
import { fontSizes } from "src/constants/fontSizes";
import { LeftColumn } from "../LeftColumn";
import { OSText } from "../OSText";
import { RankIcon } from "./RankIcon";

interface Props {
    data: Player,
    index: number
}

export const PlayerView = (props: Props) => {


    return (
        <View style={{ ...styles.container }}>
            <LeftColumn>
                <RankIcon {...props} />
                <RText>{props.data.name}</RText>
            </LeftColumn>

            <OSText>{props.data.matchRating}</OSText>
            <OSText>{props.data.skill}</OSText>
            <OSText>{props.data.skillUncertainty}</OSText>

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 4
    },
    text: {
        fontSize: fontSizes.normal,

    },

})