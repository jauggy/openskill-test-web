import { Player, Team } from "services/types";
import { MuSigma } from "./types";
const { rate } = require('openskill')

function toMuSigma(player: Player) {
    const result: MuSigma = {
        mu: player.skill,
        sigma: player.skillUncertainty
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

export const osUtil = {
    addNewRatings: addNewRatings
}
