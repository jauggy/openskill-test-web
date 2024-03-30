import React from "react";
import { StyleSheet, View } from "react-native";
import { fontSizes } from "src/constants/fontSizes";
import { SortedTeam } from "src/services/types";
import { RText } from "../Typography/RText";
import { PlayerView } from "./PlayerView";

interface Props {
    data: SortedTeam,
    index: number
}

export const TeamView = (props: Props) => {


    return (
        <View style={{ ...styles.container }}>
            <RText>Team {props.index + 1}</RText>
            {props.data.players.map((x, index) => {
                return <PlayerView key={x.id} index={index} data={x} />
            })}
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
        width: 400
    },
    text: {
        fontSize: fontSizes.normal,

    }
})