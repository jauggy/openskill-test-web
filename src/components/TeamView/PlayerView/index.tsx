import React from "react";
import { StyleSheet, View } from "react-native";
import { Player } from "services/types";
import { RText } from "src/components/Typography/RText";
import { fontSizes } from "src/constants/fontSizes";
import { LeftColumn } from "../LeftColumn";
import { OSText } from "../OSText";
import { MuChange } from "./MuChange";
import { OSChange } from "./OSChange";
import { RankIcon } from "./RankIcon";
import { SigmaChange } from "./SigmaChange";

interface Props {
    data: Player,
    index: number
}

export const PlayerView = (props: Props) => {


    return (
        <View style={{ ...styles.container }}>
            <LeftColumn>
                <RankIcon rank={props.data.rank} index={props.index} />
                <RText>{props.data.name}</RText>
            </LeftColumn>

            <OSText>{props.data.matchRating}</OSText>
            <OSText>{props.data.skill}</OSText>
            <OSText>{props.data.skillUncertainty}</OSText>
            <OSChange {...props} />
            <MuChange {...props} />
            <SigmaChange {...props} />

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