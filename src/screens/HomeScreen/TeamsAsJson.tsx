import { RButton } from 'components/Buttons/RButton';
import { RLink } from 'components/Buttons/RLink';
import { FormTextInputMulti } from 'components/FormTextInputMulti';
import { Spacer } from 'components/Spacer';
import { RText } from 'components/Typography/RText';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Team } from 'services/types';
import { homeScreenUtil } from './homeScreenUtil';


interface Props {
    teams: Team[],
    onUpdateTeams: (json: string) => void
}

export const TeamsAsJson = (props: Props) => {
    const [text, setText] = useState(null)
    const [showDebug, setShowDebug] = useState(false)
    useEffect(() => {
        if (props.teams?.length == 2) {
            const newText = JSON.stringify(props.teams)
            setText(newText)
        }
    }, [props.teams])

    const createDummyTeams = (playersPerTeam: number) => {
        const teams = homeScreenUtil.createCloneTeams(playersPerTeam)
        props.onUpdateTeams(JSON.stringify(teams))
    }

    if (!showDebug) {
        return <RLink onPress={() => setShowDebug(true)} label='Show Debug' />
    }

    if (text) {
        return (
            <View>
                <RText>You can override players' skill/uncertainty by editing the json below. </RText>
                <FormTextInputMulti onChangeText={setText} value={text} />
                <RButton label='Update teams using json' icon={''} onPress={() => props.onUpdateTeams(text)}
                />
                <Spacer />
                <View style={styles.row}>
                    <RButton label='Create 2v2 dummy teams' icon={''}
                        onPress={() => createDummyTeams(2)}
                    />
                    <RButton label='Create 8v8 dummy teams' icon={''}
                        onPress={() => createDummyTeams(8)}
                    />
                </View>
                <Spacer />
            </View>
        )
    }

    return null;

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})
