import { BottomMessage } from 'components/BottomMessage';
import { IconTextButton } from 'components/Buttons/IconTextButton';
import { RLink } from 'components/Buttons/RLink';
import { RTextInput } from 'components/RTextInput';
import { Spacer } from 'components/Spacer';
import { RText } from 'components/Typography/RText';
import { RWeakText } from 'components/Typography/RWeakText';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { bottomMessageUtil } from 'util/bottomMessageUtil';
import { osUtil } from 'util/osUtil';

const url = `https://server4.beyondallreason.info/battle/ratings`

interface CastResult {
    skill: number,
    matchRating: number,
    numMatches: number,
    teamSize: number
}

function castToNumbers(skillText: string, mrText: string, numMatchesText: string, teamSizeText: string): CastResult {
    const skill = parseFloat(skillText)
    const mr = parseFloat(mrText)
    const numMatches = parseFloat(numMatchesText)
    const teamSize = parseFloat(teamSizeText)

    if (isNaN(skill)) {
        throw 'Skill is invalid number'
    }
    if (isNaN(mr)) {
        throw 'Match Rating is invalid number'
    }
    if (isNaN(numMatches) || numMatches <= 0) {
        throw 'Number of Matches is invalid number'
    }
    if (isNaN(teamSize) || teamSize <= 0) {
        throw 'Team Size is invalid number'
    }



    return {
        skill: skill,
        matchRating: mr,
        teamSize: teamSize,
        numMatches: numMatches
    }
}

export const MultiMatchScreen = () => {
    const [skill, setSkill] = React.useState("25");
    const [mr, setMr] = React.useState("16.67");
    const [numMatches, setNumMatches] = React.useState("10");
    const [teamSize, setTeamSize] = React.useState("8");
    const [resultText, setResultText] = useState(null)
    const [weakResultText, setWeakResultText] = useState(null)
    const [strongResultText, setStrongResultText] = useState(null)

    const onLinkAccount = () => {
        window.open(url, '_blank').focus();

    }

    const onSubmit = (isWinner?: boolean) => {

        try {
            const castResult = castToNumbers(skill, mr, numMatches, teamSize)
            const sigma = castResult.skill - castResult.matchRating
            const result = osUtil.cloneAndRateMultiple(castResult.skill, sigma, castResult.teamSize, isWinner, castResult.numMatches)

            const newOs = (result.mu - result.sigma).toFixed(2)
            const newMu = result.mu.toFixed(2)
            const newSigma = result.sigma.toFixed(2)
            const winText = isWinner ? "winning" : "losing"
            const strongText = `${newOs}`
            const text = `After ${winText} ${numMatches} matches, your new Match Rating (OS) would be `
            const weakText = `\t(μ=${newMu}, σ=${newSigma})`
            setResultText(text)
            setWeakResultText(weakText)
            setStrongResultText(strongText)

        } catch (e) {
            bottomMessageUtil.error(e)
        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.rowContainer}>
                <RTextInput label='Skill (μ)' value={skill} setValue={setSkill} />
                <View style={styles.gap} />
                <RTextInput label='Match Rating (OS)' value={mr} setValue={setMr} />
                <View style={styles.gap} />
                <RTextInput label='Number of Matches' value={numMatches} setValue={setNumMatches} />
                <View style={styles.gap} />
                <RTextInput label='Team Size' value={teamSize} setValue={setTeamSize} />
            </View>
            <View style={styles.textContainer}>
                <Spacer />

                <RText>Enter your latest skill and match rating values above. These values can be found via the website:</RText>
                <RLink label={url} onPress={onLinkAccount} />
                <Spacer />

                <RText>Pressing a button below will calculate your new rating if you were to win/lose matches where everyone is a clone of yourself. The probability of winning each match will be 50%, but your rating will change more if the team size is smaller.</RText>
                <Spacer />
            </View>

            <View style={styles.rowContainer}>
                <IconTextButton label='Win Streak' icon={'trending-up'}
                    onPress={() => onSubmit(true)}
                />
                <View style={styles.gap} />
                <IconTextButton label='Loss Streak' icon={'trending-down'}
                    onPress={() => onSubmit(false)}
                />
            </View>
            <Spacer />
            <View style={styles.textContainer}>
                <View style={styles.rowContainer}>
                    <RText>{resultText}</RText>
                    <RText bold>{strongResultText}</RText>
                    <RWeakText>{weakResultText}</RWeakText>

                </View>

            </View>
            <BottomMessage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    gap: {
        width: 20
    },
    textContainer: {
        width: 800
    }
});
