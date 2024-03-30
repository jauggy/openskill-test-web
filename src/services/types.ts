export interface ReplayResponse {
    id: string,
    AllyTeams: TeamDto[]
}

export interface TeamDto {
    Players: PlayerDto[],
    allyTeamId: number
}

export interface PlayerDto {
    id: number,
    userId: number,
    name: string,
    skill: string, //format is ["13.31"]
    rank: number,
    skillUncertainty: number
}

export interface Team {
    Players: Player[],
    id: number
}

export interface Player {
    id: number,
    userId: number,
    name: string,
    skill: number,
    rank: number,
    skillUncertainty: number
}