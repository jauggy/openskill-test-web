import { RButton } from 'components/Buttons/RButton';
import { RLink } from 'components/Buttons/RLink';
import { FormTextInputMulti } from 'components/FormTextInputMulti';
import { Spacer } from 'components/Spacer';
import { RText } from 'components/Typography/RText';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Team } from 'services/types';


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
            </View>
        )
    }

    return null;

}
