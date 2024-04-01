import { RButton } from 'components/Buttons/RButton';
import { StyleSheet, View } from 'react-native';
import { homeScreenUtil } from './homeScreenUtil';


interface Props {
    onUpdateTeams: (json: string) => void
}

export const DummyButtons = (props: Props) => {


    const createDummyTeams = (playersPerTeam: number) => {
        const teams = homeScreenUtil.createCloneTeams(playersPerTeam)
        props.onUpdateTeams(JSON.stringify(teams))
    }



    return (

        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <RButton label='Create 2v2 dummy teams' icon={''}
                    onPress={() => createDummyTeams(2)}
                />
            </View>
            <View style={styles.buttonContainer}>

                <RButton label='Create 8v8 dummy teams' icon={''}
                    onPress={() => createDummyTeams(8)}
                />
            </View>
        </View>

    )



}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
    },
    buttonContainer: {
        marginTop: 19,
    }
})
