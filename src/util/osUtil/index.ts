import { Player, Team } from "services/types";
import { MuSigma, Prediction } from "./types";
const { rate, predictWin } = require('openskill')

function toMuSigma(player: Player) {
    const result: MuSigma = {
        mu: player.skill,
        sigma: player.uncertainty
    }
    return result;
}

function toOsTeam(team: Team): MuSigma[] {
    return team.players.map(x => toMuSigma(x))
}

function addNewRatings(winningTeam: Team, losingTeam: Team, overrideOldRating?: boolean, tau?: number) {
    const winner = toOsTeam(winningTeam);
    const loser = toOsTeam(losingTeam)
    const result = rate([winner, loser], { tau: tau });
    //This should be an array of size 2
    const winningResult: MuSigma[] = result[0];
    const losingResult: MuSigma[] = result[1];

    if (!overrideOldRating) {
        for (let i = 0; i < winningResult.length; i++) {
            const player = winningTeam.players[i];
            player.newRating = winningResult[i]
        }

        for (let i = 0; i < losingResult.length; i++) {
            const player = losingTeam.players[i];
            player.newRating = losingResult[i]
        }


    }
    else {
        for (let i = 0; i < winningResult.length; i++) {
            const player = winningTeam.players[i];
            player.skill = winningResult[i].mu
            player.uncertainty = winningResult[i].sigma
        }

        for (let i = 0; i < losingResult.length; i++) {
            const player = losingTeam.players[i];
            player.skill = losingResult[i].mu
            player.uncertainty = losingResult[i].sigma
        }

    }

    return result




}

function predict(team1: Team, team2: Team): Prediction {
    const t1 = toOsTeam(team1);
    const t2 = toOsTeam(team2);
    const prediction = predictWin([t1, t2])
    return {
        team1Wins: prediction[0],
        team2Wins: prediction[1]
    }
}

function getPredictText(team1: Team, team2: Team) {
    const prediction = predict(team1, team2)
    const team1Wins = (prediction.team1Wins * 100).toFixed(1);
    const team2Wins = (prediction.team2Wins * 100).toFixed(1);

    return `OpenSkill Library win probabilities for Team 1 is ${team1Wins}% and for Team 2 is ${team2Wins}%`
}

/**
 * Clones a user into teams and re-rates them after win/loss
 */
function cloneAndRate(mu: number, sigma: number, teamSize: number, isWinner: boolean, tau: number) {
    if (teamSize <= 0) {
        throw 'Team size should be greater than 0'
    }
    const player: Player = {
        name: "Cloned User",
        skill: mu,
        rank: 0,
        uncertainty: sigma
    }

    const players = [];
    for (let i = 0; i < teamSize; i++) {
        players.push(cloneObject(player))
    }

    const team1: Team = {
        players: players,
        id: 0
    }

    const team2: Team = {
        players: cloneObject(players),
        id: 1
    }

    addNewRatings(team1, team2, true, tau)

    if (isWinner) {
        return team1.players[0]
    }
    else {
        return team2.players[0]

    }
}

function cloneAndRateMultiple(mu: number, sigma: number, teamSize: number, isWinner: boolean, numMatches: number, tau: number): MuSigma {
    let currentMu = mu;
    let currentSigma = sigma
    for (let i = 0; i < numMatches; i++) {
        const result = cloneAndRate(currentMu, currentSigma, teamSize, isWinner, tau)
        currentMu = result.skill
        currentSigma = result.uncertainty
    }

    return {
        mu: currentMu,
        sigma: currentSigma
    }
}

function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export const osUtil = {
    addNewRatings: addNewRatings,
    getPredictText: getPredictText,
    cloneAndRate: cloneAndRate,
    cloneAndRateMultiple: cloneAndRateMultiple
}
