import { Player, Team } from "services/types";
import { objectUtil } from "util/objectUtil";
/**
* Returns a list of players with better players in front of array
*/
function getPlayers(teams: Team[]) {
    const players = teams.map(x => x.players).flat()

    const nonNoobs = players.filter(x => x.rank > 1);
    const noobs = players.filter(x => x.rank <= 1);
    nonNoobs.sort(compareExperiencedPlayers);
    noobs.sort(compareNoobs);

    return [nonNoobs, noobs].flat();
}

function compareExperiencedPlayers(a: Player, b: Player) {
    return (b.skill - b.uncertainty) - (a.skill - a.uncertainty)
}

function compareNoobs(a: Player, b: Player) {
    return -(b.uncertainty - a.uncertainty)
}

function createTeams(players: Player[]): Team[] {
    const teams: Team[] = []
    for (let i = 0; i < 2; i++) {
        teams.push({
            id: i,
            players: []
        })
    }

    for (let i = 0; i < players.length; i++) {
        let pickingTeam = getPickingTeam(teams);
        pickingTeam.players.push(objectUtil.clone(players[i]))
    }

    return teams;
}

/**
 * Returns sorted teams but doesn't modify the original input
 */
function rebalanceTeams(teams: Team[]) {
    const players = getPlayers(teams);
    return createTeams(players);
}

function getPickingTeam(teams: Team[]) {
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

function getTeamRating(team: Team) {
    if (team.players?.length > 0) {
        const ratings = team.players.map(x => x.skill - x.uncertainty);
        return ratings.reduce((partialSum, a) => partialSum + a, 0);
    }

    return 0;

}


function getDescription() {
    let result = `The team with the least amount of players will pick an unchosen player. If there are multiple teams tied for the lowest player count, then the team with the lowest match rating picks.`
    result += `\n\nYour team will prefer 3Chev+ players with high OS. If your team must pick a 1-2Chev player, it will prefer lower uncertainty.`
    return result;
}


export const splitOneChevs2 = {
    rebalanceTeams: rebalanceTeams,
    name: "Split One Chevs v2",
    getDescription: getDescription
}