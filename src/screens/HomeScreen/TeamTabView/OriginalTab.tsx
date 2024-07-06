import { TextButton } from 'components/Buttons/TextButton';
import { RCheckBox } from 'components/RCheckBox';
import { Spacer } from 'components/Spacer';
import { TeamView } from 'components/TeamView';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Team } from 'services/types';
import { osUtil } from 'util/osUtil';
import { PredictText } from '../PredictText';
import { AlgoDescriptionText } from './AlgoDescriptionText';

interface Props {
    teams: Team[],
}

export const OriginalTab = (props: Props) => {
    const [renderTime, setRenderTime] = useState(new Date())
    const [useTau, setUseTau] = useState(true)

    const onTeam1Wins = () => {
        const overrideOldRating = false
        const tau = useTau ? osUtil.getSeason1Tau() : 0
        osUtil.addNewRatings(teams[0], teams[1], overrideOldRating, tau)
        setRenderTime(new Date());
    }

    const onTeam2Wins = () => {
        const overrideOldRating = false
        const tau = useTau ? osUtil.getSeason1Tau() : 0
        osUtil.addNewRatings(teams[1], teams[0], overrideOldRating, tau)
        setRenderTime(new Date());
    }

    const teams = props.teams

    return (
        <View style={styles.container}>
            <Spacer />
            {teams.map((x, index) => {
                const key = `${index}:${renderTime.toString()}`
                return <TeamView data={x} index={index} key={key} />
            })}
            <AlgoDescriptionText algo={null} />
            <PredictText teams={teams} />
            <Spacer />
            <View style={styles.row}>
                <TextButton label='Team 1 wins' onPress={onTeam1Wins} />
                <View style={{ width: 20 }} />
                <TextButton label='Team 2 wins' onPress={onTeam2Wins} />
                <View style={{ width: 20 }} />
                <RCheckBox onValueChanged={setUseTau}
                    label={'Use Tau of 1/3 (used from Season 1)'}
                    isChecked={useTau} />
            </View>
            <Spacer />
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    description: {
        alignItems: 'flex-start'
    },
    scrollContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 20
    },
    paddingColumn: {
        flex: 1
    },
    searchContainer: {
        width: 800,
    },
    rightColumn: {
        width: 250
    },
    row: {
        flexDirection: 'row'
    }
});
