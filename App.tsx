import { RobotoCondensed_300Light } from '@expo-google-fonts/roboto-condensed';
import { BottomMessage } from 'components/BottomMessage';
import { RActivityIndicatorFlex } from 'components/Loading/RActivityIndicatorFlex';
import { Spacer } from 'components/Spacer';
import { TeamView } from 'components/TeamView';
import { RText } from 'components/Typography/RText';
import { useFonts } from 'expo-font';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchInput } from 'src/components/SearchInput';
import { replayService } from 'src/services/replayService';
import { replayUtil } from 'src/util/replayUtil';
import { bottomMessageUtil } from 'util/bottomMessageUtil';




export default function App() {
    const [teams, setTeams] = useState(null)
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
        console.log(result);

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

                {renderContent()}

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
