import { ReplayResponse, SortedPlayer, SortedTeam } from "services/types";

export interface BalanceAlgo {
    createTeams: (players: SortedPlayer[]) => SortedTeam[]
    getPlayers: (response: ReplayResponse) => SortedPlayer[],
    name: string,
    getDescription: () => string
}