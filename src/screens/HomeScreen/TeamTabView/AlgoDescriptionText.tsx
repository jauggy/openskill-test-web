import { RText } from 'components/Typography/RText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    algo: 'split_one_chevs' | null
}

export const AlgoDescriptionText = (props: Props) => {
    if (!props.algo) {
        return <View style={styles.container} />
    }
    return (
        <View style={styles.container}>

            <RText>
                This algorithm will evenly distribute new players (1-2Chevs) evenly across teams. Your team will pick 3Chev+ players first, preferring higher OS. If there are only new players to pick from, your team will prefer lower uncertainty.
            </RText>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 50
    },
});
