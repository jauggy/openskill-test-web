import { ReplayResponse, SortedPlayer } from "src/services/types";
import { splitOneChevs } from "./splitOneChevs";
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


    return detailedPlayers;
}

function comparePlayers(a: SortedPlayer, b: SortedPlayer) {
    const leaderBoardRatingA = a.matchRating - a.sigma * 2
    const leaderBoardRatingB = b.matchRating - b.sigma * 2

    return leaderBoardRatingB - leaderBoardRatingA
}

function createTeams(players: SortedPlayer[]) {
    return splitOneChevs.createTeams(players);
}

function skillStringToNumber(skillString: string) {
    const regex = /[\d.]+/gm
    const found = regex.exec(skillString)

    return (parseFloat(found[0]));
}

function getDescription() {
    const result = `All players will be sorted by leaderboard rating (i.e. mu-3*sigma). The team with the lowest amount of players will pick first from this sorted player list. If there are multiple teams with the lowest player count, then the team with the lowest match rating picks.`
    return result;
}


export const pickByLeader: BalanceAlgo = {
    getPlayers: getPlayers,
    createTeams: createTeams,
    name: "Pick by leaderboard rating",
    getDescription: getDescription
}