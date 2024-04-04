import { BottomMessage } from 'components/BottomMessage';
import { RButton } from 'components/Buttons/RButton';
import { RLink } from 'components/Buttons/RLink';
import { RActivityIndicatorFlex } from 'components/Loading/RActivityIndicatorFlex';
import { Spacer } from 'components/Spacer';
import { TeamView } from 'components/TeamView';
import { RText } from 'components/Typography/RText';
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




export const HomeScreen = () => {
    const [assignChangesCount, setAssignChangesCount] = useState(0)
    const [teams, setTeams] = useState<Team[]>(null)
    const [renderTime, setRenderTime] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false);
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
        setAssignChangesCount(0)
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
        osUtil.addNewRatings(teams[0], teams[1])
        setRenderTime(new Date());
    }

    const onTeam2Wins = () => {
        osUtil.addNewRatings(teams[1], teams[0])
        setRenderTime(new Date());
    }

    const onUpdateTeams = (json: string) => {
        try {
            const o = JSON.parse(json);
            setTeams(o)
            setAssignChangesCount(0)
        } catch (e) {
            bottomMessageUtil.error("Invalid json")
        }

    }

    const onAssignChanges = () => {
        osUtil.assignNewRatings(teams)
        setAssignChangesCount(prevCount => prevCount + 1)
        setRenderTime(new Date())
    }

    const renderContent = () => {
        if (isLoading) {
            return <RActivityIndicatorFlex label="Loading..." />

        }
        if (teams) {
            if (teams.length === 2) {
                return (
                    <React.Fragment>
                        <View style={styles.teamContainer}>
                            <View>
                                {teams.map((x, index) => {
                                    const key = `${index}:${renderTime.toString()}`
                                    return <TeamView data={x} index={index} key={key} />
                                })}
                            </View>
                            <View>
                                <View>
                                    <RButton icon='magnify' label='Team 1 wins' onPress={onTeam1Wins} />
                                    <Spacer small />
                                    <RButton icon='magnify' label='Team 2 wins' onPress={onTeam2Wins} />
                                </View>
                                <View style={styles.assignChangesLink}>
                                    {teams[0].players[0].newRating &&
                                        <RLink label='⇐ Assign Changes' onPress={onAssignChanges} />
                                    }
                                </View>
                            </View>

                        </View>

                        <PredictText teams={teams} />
                        <Spacer />

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
                    <SearchInput onSearch={onSearch} placeholder='https://www.beyondallreason.info/replays?gameId=2c71ca6504f9e3b5a02732d0fbdcb5bc' />

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
        width: 840,
    },
    rightColumn: {
        width: 250
    },
    row: {
        flexDirection: 'row'
    },
    teamContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    assignChangesLink: {
        height: 50,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
