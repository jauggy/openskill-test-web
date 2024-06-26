import { BookmarkIcon } from 'components/BookmarkIcon';
import { BottomMessage } from 'components/BottomMessage';
import { TextButton } from 'components/Buttons/TextButton';
import { RActivityIndicatorFlex } from 'components/Loading/RActivityIndicatorFlex';
import { RCheckBox } from 'components/RCheckBox';
import { Spacer } from 'components/Spacer';
import { TeamView } from 'components/TeamView';
import { RText } from 'components/Typography/RText';
import { pathConfig } from 'constants/pathConfig';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Team } from 'services/types';
import { SearchInput } from 'src/components/SearchInput';
import { replayService } from 'src/services/replayService';
import { replayUtil } from 'src/util/replayUtil';
import { bottomMessageUtil } from 'util/bottomMessageUtil';
import { osUtil } from 'util/osUtil';
import { DummyButtons } from './DummyButtons';
import { PredictText } from './PredictText';
import { TeamsAsJson } from './TeamsAsJson';

const PLACEHOLDER = "https://www.beyondallreason.info/replays?gameId=c101576679574ae4f7a0bc9bd9d6a975"

export const HomeScreen = () => {
    const [teams, setTeams] = useState<Team[]>(null)
    const [renderTime, setRenderTime] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false);
    const [useTau, setUseTau] = useState(true)
    const dimensions = useWindowDimensions();
    const stateRef = useRef({
        apiResponse: null
    })


    const setup = async (replayId: string) => {
        if (!replayId) {
            return
        }
        const result = await replayService.getReplay(replayId);
        stateRef.current.apiResponse = result;

        setTeams(result)
    }

    const onSearch = (search: string) => {
        setIsLoading(true);
        const replayId = replayUtil.getReplayId(search);
        setIsLoading(false);
        if (!replayId) {
            bottomMessageUtil.error("Invalid Replay url");
            return;
        }
        setup(replayId)
    }

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

    const onUpdateTeams = (json: string) => {
        try {
            const o = JSON.parse(json);
            setTeams(o)
        } catch (e) {
            bottomMessageUtil.error("Invalid json")
        }

    }

    const renderContent = () => {
        if (isLoading) {
            return <RActivityIndicatorFlex label="Loading..." />

        }
        if (teams) {
            if (teams.length === 2) {
                return (
                    <React.Fragment>
                        {teams.map((x, index) => {
                            const key = `${index}:${renderTime.toString()}`
                            return <TeamView data={x} index={index} key={key} />
                        })}
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
                        <TeamsAsJson teams={teams} onUpdateTeams={onUpdateTeams} />
                    </React.Fragment>
                )
            } else {
                return <RText>Only matches with 2 teams are supported for now.</RText>
            }

        }
        return null;
    }



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollContainer, { width: dimensions.width }]}>
                <View style={styles.paddingColumn} />
                <View style={styles.searchContainer}>
                    <RText>Enter BAR replay URL:</RText>
                    <SearchInput onSearch={onSearch} placeholder={PLACEHOLDER} />

                    <Spacer small />


                    <Spacer />

                    {renderContent()}



                </View>
                <View style={styles.rightColumn}>

                    <DummyButtons onUpdateTeams={onUpdateTeams} />
                </View>
                <View style={styles.paddingColumn} />

            </ScrollView>




            <BottomMessage />
            <BookmarkIcon path={pathConfig.SINGLE_MATCH} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
