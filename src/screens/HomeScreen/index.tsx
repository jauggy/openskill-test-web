import { BookmarkIcon } from 'components/BookmarkIcon';
import { BottomMessage } from 'components/BottomMessage';
import { RActivityIndicatorFlex } from 'components/Loading/RActivityIndicatorFlex';
import { Spacer } from 'components/Spacer';
import { RText } from 'components/Typography/RText';
import { pathConfig } from 'constants/pathConfig';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Team } from 'services/types';
import { SearchInput } from 'src/components/SearchInput';
import { replayService } from 'src/services/replayService';
import { replayUtil } from 'src/util/replayUtil';
import { bottomMessageUtil } from 'util/bottomMessageUtil';
import { urlUtil } from 'util/urlUtil';
import { DummyButtons } from './DummyButtons';
import { TeamTabView } from './TeamTabView';

const PLACEHOLDER = "https://www.beyondallreason.info/replays?gameId=39096966518c40a66b2130b057864aa5"

export const HomeScreen = () => {
    const [teams, setTeams] = useState<Team[]>(null)
    const [isLoading, setIsLoading] = useState(false);
    const dimensions = useWindowDimensions();
    const stateRef = useRef({
        apiResponse: null,
        replayId: null
    })

    useEffect(() => {
        stateRef.current.replayId = urlUtil.getReplayId()
        setup(stateRef.current.replayId)
    }, [])


    const setup = async (replayId: string) => {
        if (!replayId) {
            return
        }

        const result = await replayService.getReplay(replayId);
        stateRef.current.apiResponse = result;

        setTeams(result)
    }

    const getBookmarkPath = () => {
        const replayId = stateRef.current.replayId
        if (replayId) {
            const replayId = encodeURIComponent(stateRef.current.replayId)
            return pathConfig.SINGLE_MATCH + `?replay=${replayId}`
        }

        return pathConfig.SINGLE_MATCH
    }

    const onSearch = (search: string) => {
        const replayId = replayUtil.getReplayId(search);
        onSearchReplayId(replayId)
    }

    const onSearchReplayId = (replayId: string) => {
        if (!replayId) {
            bottomMessageUtil.error("Invalid Replay url");
            return;
        }
        stateRef.current.replayId = replayId
        setup(replayId)
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
                    <TeamTabView teams={teams} />
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
            <BookmarkIcon getPath={getBookmarkPath} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    description: {
        alignItems: 'flex-start'
    },
    scrollContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 20,
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
