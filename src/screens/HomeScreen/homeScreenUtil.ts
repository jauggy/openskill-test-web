function createCloneTeams(playersPerTeam: number) {
    const teams = [{
        id: 0,
        players: []
    },
    {
        id: 1,
        players: []
    }]

    //Now add player
    for (let i = 0; i < playersPerTeam; i++) {
        teams[0].players.push(createDummyPlayer())
        teams[1].players.push(createDummyPlayer())

    }

    return teams
}

function createDummyPlayer() {
    return {
        "name": "Dummy",
        "rank": 4,
        "uncertainty": 25 / 3,
        "skill": 25
    }
}

export const homeScreenUtil = {
    createCloneTeams: createCloneTeams
}