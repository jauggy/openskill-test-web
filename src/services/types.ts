export interface ReplayResponse {
    id: string,
    AllyTeams: Team[]
}

export interface Team {
    Players: Player[],
    allyTeamId: number
}

export interface Player {
    id: number,
    userId: number,
    name: string,
    skill: string, //format is ["13.31"]
    rank: number,
    skillUncertainty: number
}

export interface SortedPlayer {
    matchRating: number,
    id: number,
    name: string,
    rank: number,
    mu: number,
    sigma: number
}

export interface SortedTeam {
    players: SortedPlayer[]
}