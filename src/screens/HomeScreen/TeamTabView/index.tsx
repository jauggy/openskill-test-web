import { Team } from "services/types";
import { OriginalTab } from "./OriginalTab";


interface Props {
    teams: Team[]
}

export const TeamTabView = (props: Props) => {

    return (
        <OriginalTab teams={props.teams} />
    )

}
