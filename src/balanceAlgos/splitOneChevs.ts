import { ReplayResponse, SortedPlayer, SortedTeam } from "src/services/types";
import { BalanceAlgo } from "./types";

/**
 * Returns a list of players with better players in front of array
 */
function getPlayers(response: ReplayResponse) {
    const players = response.AllyTeams.flatMap(x => x.Players);
    const detailedPlayers: SortedPlayer[] = players.map(x => {
        let player: SortedPlayer;
        const visibleOs = skillStringToNumber(x.skill); //This should be mu-sigma
        const sigma = x.skillUncertainty;
        const matchRating = visibleOs; //This shoud be mu-3*sigma
        player = {
            name: x.name,
            id: x.id,
            matchRating: matchRating,
            rank: x.rank,
            mu: visibleOs + sigma,
            sigma: sigma
        }
        return player;
    })
    detailedPlayers.sort(comparePlayers);

    const nonNoobs = detailedPlayers.filter(x => x.rank > 0);
    const noobs = detailedPlayers.filter(x => x.rank === 0);
    return [nonNoobs, noobs].flat();
}

function comparePlayers(a: SortedPlayer, b: SortedPlayer) {
    return b.matchRating - a.matchRating
}

function createTeams(players: SortedPlayer[]) {
    const teams: SortedTeam[] = []
    for (let i = 0; i < 2; i++) {
        teams.push({
            players: []
        })
    }

    for (let i = 0; i < players.length; i++) {
        let pickingTeam = getPickingTeam(teams);
        pickingTeam.players.push(players[i])
    }

    return teams;
}

function getPickingTeam(teams: SortedTeam[]) {
    //Find teams with least amount of players
    const playerCount = teams.map(x => x.players.length);
    const minPlayerCount = Math.min(...playerCount);
    const smallestTeams = teams.filter(x => x.players.length === minPlayerCount);

    //Now out of these find the one with lowest player score;
    let lowestScore = null;
    let pickingTeam = null;
    smallestTeams.forEach(team => {
        if (lowestScore === null) {
            lowestScore = getTeamRating(team);
            pickingTeam = team;
        } else {
            const thisTeamRating = getTeamRating(team);
            if (thisTeamRating < lowestScore) {
                lowestScore = thisTeamRating;
                pickingTeam = team;
            }
        }
    })

    return pickingTeam;
}

function getTeamRating(team: SortedTeam) {
    if (team.players?.length > 0) {
        const ratings = team.players.map(x => x.matchRating);
        return ratings.reduce((partialSum, a) => partialSum + a, 0);
    }

    return 0;

}

function skillStringToNumber(skillString: string) {
    const regex = /[\d.]+/gm
    const found = regex.exec(skillString)

    return (parseFloat(found[0]));
}

function getDescription() {
    const result = `All players will be sorted by visible OS. Then all one chevs will be placed at the bottom of the list. The team with the lowest amount of players will pick first from this sorted player list. If there are multiple teams with the lowest player count, then the team with the lowest match rating picks.`
    return result;
}


export const splitOneChevs: BalanceAlgo = {
    getPlayers: getPlayers,
    createTeams: createTeams,
    name: "Split one chevs",
    getDescription: getDescription
}