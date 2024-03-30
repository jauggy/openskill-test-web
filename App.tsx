import { RobotoCondensed_300Light } from '@expo-google-fonts/roboto-condensed';
import { AlgoSelect } from 'components/AlgoSelect';
import { BottomMessage } from 'components/BottomMessage';
import { RActivityIndicatorFlex } from 'components/Loading/RActivityIndicatorFlex';
import { Spacer } from 'components/Spacer';
import { TeamView } from 'components/TeamView';
import { RText } from 'components/Typography/RText';
import { useFonts } from 'expo-font';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { pickByLeader } from 'src/balanceAlgos/pickByLeader';
import { splitOneChevs } from 'src/balanceAlgos/splitOneChevs';
import { BalanceAlgo } from 'src/balanceAlgos/types';
import { SearchInput } from 'src/components/SearchInput';
import { replayService } from 'src/services/replayService';
import { SortedTeam } from 'src/services/types';
import { replayUtil } from 'src/util/replayUtil';
import { bottomMessageUtil } from 'util/bottomMessageUtil';

const ALGOS: BalanceAlgo[] = [splitOneChevs, pickByLeader]



export default function App() {
    const [teams, setTeams] = useState<SortedTeam[]>();
    const [algo, setAlgo] = useState<BalanceAlgo>(splitOneChevs)
    const [isLoading, setIsLoading] = useState(false);
    const stateRef = useRef({
        apiResponse: null
    })
    let [fontsLoaded] = useFonts({
        RobotoCondensed_300Light,

    });

    const setup = async (replayId: string) => {
        if (!replayId) {
            return
        }
        const result = await replayService.getReplay(replayId);
        stateRef.current.apiResponse = result;
        const players = algo.getPlayers(result);
        const teams = algo.createTeams(players);
        setTeams(teams);
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

    const onAlgoSelected = (algo: BalanceAlgo) => {
        setAlgo(algo);

        const players = algo.getPlayers(stateRef.current.apiResponse);
        const teams = algo.createTeams(players);
        setTeams(teams);

    }

    const renderContent = () => {
        if (isLoading) {
            return <RActivityIndicatorFlex label="Loading..." />

        }
        if (teams) {
            return (
                <React.Fragment>
                    {teams.map((x, index) => {
                        return <TeamView data={x} index={index} key={index} />
                    })}
                </React.Fragment>
            )
        }
        return null;
    }

    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <RText>Enter BAR replay URL:</RText>

                <Spacer small />
                <SearchInput onSearch={onSearch} placeholder='https://www.beyondallreason.info/replays?gameId=2c71ca6504f9e3b5a02732d0fbdcb5bc' />

                <Spacer />
                <View style={styles.row}>
                    <RText>Balance Algorithm: </RText>
                    <AlgoSelect algo={algo} onAlgoSelected={onAlgoSelected} />
                </View>
                {renderContent()}
                <View style={styles.description}>
                    <RText>Balance Algorithm Description</RText>
                    <Spacer small />
                    <RText>{algo.getDescription()}</RText>
                </View>
            </View>



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
    searchContainer: {
        marginTop: 20,
        justifyContent: 'center',
        width: 800
    },
    row: {
        flexDirection: 'row'
    }
});
