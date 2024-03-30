import { stringUtil } from 'util/stringUtil';
import * as apiService from './apiService';
import { Player, PlayerDto, ReplayResponse, Team, TeamDto } from './types';
const test = async () => {
    return getReplay("773cd06548c8c81e36fc964e1df43f6a");
}

async function getReplay(replayId: string): Promise<Team[]> {
    //The url should be something like:
    //https://aws.revolutionsoftware.com.au:446/
    let url;
    url = `https://api.bar-rts.com`


    apiService.setBaseUrl(url)
    try {
        const response = await apiService.get(`/replays/${replayId}`)

        const result = response.data as ReplayResponse;
        if (result) {
            return cleanTeams(result);
        } else {
            console.error(result);
        }

    } catch (err: any) {


        return null;

    }
}

function cleanTeams(response: ReplayResponse) {
    return response.AllyTeams.map(x => cleanTeam(x))
}

function cleanTeam(teamDto: TeamDto) {
    const result: Team = {
        players: teamDto.Players.map(x => cleanPlayer(x)),
        id: teamDto.allyTeamId
    }
    result.players.sort((a, b) => (b.skill - b.uncertainty) - (a.skill - a.uncertainty))

    return result;
}

function cleanPlayer(playerDto: PlayerDto) {
    const os = stringUtil.skillStringToNumber(playerDto.skill);
    const result: Player = {
        id: playerDto.id,
        name: playerDto.name,
        rank: playerDto.rank,
        uncertainty: playerDto.skillUncertainty,
        skill: os + playerDto.skillUncertainty
    }
    return result;
}

export const replayService = {
    test: test,
    getReplay: getReplay
}