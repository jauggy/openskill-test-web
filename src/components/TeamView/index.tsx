import React from "react";
import { StyleSheet, View } from "react-native";
import { Team } from "services/types";
import { fontSizes } from "src/constants/fontSizes";
import { RText } from "../Typography/RText";
import { PlayerView } from "./PlayerView";

interface Props {
    data: Team,
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