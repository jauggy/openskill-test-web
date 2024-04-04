import { RLink } from 'components/Buttons/RLink';
import React, { useEffect } from 'react';
import { Team } from 'services/types';

interface Props {
    teams: Team[]
}


export const AssignChangesButton = (props: Props) => {

    useEffect(() => {

    }, [props.teams])


    return (
        <RLink label='⇐ Assign Changes' onPress={() => { }} />

    );
}
