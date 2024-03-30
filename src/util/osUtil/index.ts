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

function addNewRatings(winningTeam: Team, losingTeam: Team) {
    const winner = toOsTeam(winningTeam);
    const loser = toOsTeam(losingTeam)
    const result = rate([winner, loser]);
    //This should be an array of size 2
    const winningResult = result[0];
    const losingResult = result[1];

    for (let i = 0; i < winningResult.length; i++) {
        const player = winningTeam.players[i];
        player.newRating = winningResult[i]
    }

    for (let i = 0; i < losingResult.length; i++) {
        const player = losingTeam.players[i];
        player.newRating = losingResult[i]
    }

    return result;

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

export const osUtil = {
    addNewRatings: addNewRatings,
    getPredictText: getPredictText
}
