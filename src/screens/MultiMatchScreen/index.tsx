import { BookmarkIcon } from 'components/BookmarkIcon';
import { IconTextButton } from 'components/Buttons/IconTextButton';
import { RLink } from 'components/Buttons/RLink';
import { RTextInput } from 'components/RTextInput';
import { Spacer } from 'components/Spacer';
import { RText } from 'components/Typography/RText';
import { RWeakText } from 'components/Typography/RWeakText';
import { pathConfig } from 'constants/pathConfig';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { bottomMessageUtil } from 'util/bottomMessageUtil';
import { osUtil } from 'util/osUtil';

const url = `https://server4.beyondallreason.info/battle/ratings`

interface CastResult {
    skill: number,
    uncertainty: number,
    numMatches: number,
    teamSize: number,
    tau: number
}

function castToNumbers(skillText: string, sigmaText: string, numMatchesText: string, teamSizeText: string, tauText: string): CastResult {
    const skill = parseFloat(skillText)
    const sigma = parseFloat(sigmaText)
    const numMatches = parseFloat(numMatchesText)
    const teamSize = parseFloat(teamSizeText)
    const tau = parseFloat(tauText)

    if (isNaN(skill)) {
        throw 'Skill is invalid number'
    }
    if (isNaN(sigma)) {
        throw 'Uncertainty is invalid number'
    }
    if (isNaN(numMatches) || numMatches <= 0) {
        throw 'Number of Matches is invalid number'
    }
    if (isNaN(teamSize) || teamSize <= 0) {
        throw 'Team Size is invalid number'
    }
    if (isNaN(tau)) {
        throw 'Tau is invalid number'
    }


    return {
        skill: skill,
        uncertainty: sigma,
        teamSize: teamSize,
        numMatches: numMatches,
        tau: tau
    }
}

export const MultiMatchScreen = () => {
    const [skill, setSkill] = React.useState("25");
    const [uncertainty, setUncertainty] = React.useState("8.33");
    const [numMatches, setNumMatches] = React.useState("10");
    const [teamSize, setTeamSize] = React.useState("8");
    const [tau, setTau] = useState("0")
    const [resultText, setResultText] = useState(null)
    const [weakResultText, setWeakResultText] = useState(null)
    const [strongResultText, setStrongResultText] = useState(null)

    const onLinkAccount = () => {
        window.open(url, '_blank').focus();

    }

    const onSubmit = (isWinner?: boolean) => {

        try {
            const castResult = castToNumbers(skill, uncertainty, numMatches, teamSize, tau)
            const result = osUtil.cloneAndRateMultiple(
                castResult.skill,
                castResult.uncertainty,
                castResult.teamSize,
                isWinner,
                castResult.numMatches,
                castResult.tau
            )

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
                <RTextInput label='Uncertainty (σ)' value={uncertainty} setValue={setUncertainty} />
                <View style={styles.gap} />

            </View>
            <View style={styles.textContainer}>
                <Spacer />

                <RText>Enter your latest skill and uncertainties values above. These values can be found via the website:</RText>
                <RLink label={url} onPress={onLinkAccount} />
                <RText>Note that skill is not the same as OS/match rating.</RText>
                <Spacer />

                <RText>Pressing a button below will calculate your new rating if you were to win/lose matches where everyone is a clone of yourself. The probability of winning each match will be 50%, but your rating will change more if the team size is smaller.</RText>
                <Spacer />
            </View>

            <View style={styles.rowContainer}>
                <RTextInput label='Number of Matches' value={numMatches} setValue={setNumMatches} />
                <View style={styles.gap} />
                <RTextInput label='Team Size' value={teamSize} setValue={setTeamSize} />
                <View style={styles.gap} />
                <View>
                    <IconTextButton fullWidth label='Win Streak' icon={'trending-up'}
                        onPress={() => onSubmit(true)}
                    />
                    <View style={{ height: 4 }} />
                    <IconTextButton fullWidth label='Loss Streak' icon={'trending-down'}
                        onPress={() => onSubmit(false)}
                    />
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <RTextInput label="Tau (Optional)" value={tau} setValue={setTau} />
                </View>

            </View>
            <View style={styles.rowContainer}>
                <RWeakText small>Leave this if you don't know what it means.</RWeakText>

            </View>
            <Spacer />
            <View style={styles.textContainer}>
                <View style={styles.rowContainer}>
                    <RText>{resultText}</RText>
                    <RText bold>{strongResultText}</RText>
                    <RWeakText>{weakResultText}</RWeakText>

                </View>

            </View>

            <BookmarkIcon path={pathConfig.MULTI_MATCH} />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row', width: 800
    },
    gap: {
        width: 20
    },
    textContainer: {
        width: 800
    }
});
