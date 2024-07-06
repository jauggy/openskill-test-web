import React from "react";
import { StyleSheet, View } from "react-native";
import { Team } from "services/types";
import { fontSizes } from "src/constants/fontSizes";
import { RText } from "../Typography/RText";
import { LeftColumn } from "./LeftColumn";
import { OSText } from "./OSText";
import { PlayerView } from "./PlayerView";

interface Props {
    data: Team,
    index: number
}

export const TeamView = (props: Props) => {


    return (
        <View style={{ ...styles.container }}>
            <View style={styles.row}>
                <LeftColumn>
                    <RText>Team {props.index + 1}</RText>
                </LeftColumn>
                <OSText>OS</OSText>
                <OSText>μ</OSText>
                <OSText>σ</OSText>
                <OSText weak>OS</OSText>
                <OSText weak>μ</OSText>
                <OSText weak>σ</OSText>
            </View>

            {props.data.players.map((x, index) => {
                const id = `${index}:${x.name}`
                const key = x.newRating ? `${id}:${x.newRating.mu}` : `${id}`
                return <PlayerView key={key} index={index} data={x} />
            })}
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    text: {
        fontSize: fontSizes.normal,

    },
    row: {
        flexDirection: 'row'
    }
})