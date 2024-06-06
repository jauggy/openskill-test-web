import { RText } from 'components/Typography/RText';
import { Team } from 'services/types';
import { osUtil } from 'util/osUtil';

interface Props {
    teams: Team[]
}

export const MatchQualityText = (props: Props) => {

    if (props.teams?.length == 2) {
        const text = osUtil.getMatchQualityText(props.teams[0], props.teams[1])
        return (
            <RText>{text}</RText>
        )


    }

    return null;

}

