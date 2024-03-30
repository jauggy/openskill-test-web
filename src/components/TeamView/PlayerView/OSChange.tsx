import React from "react";
import { Player } from "services/types";
import { NumberChange } from "../NumberChange";

interface Props {
    data: Player,
    index: number
}

export const OSChange = (props: Props) => {

    if (props.data.newRating) {
        const newMu = props.data.newRating.mu
        const change = newMu - props.data.skill
        return (

            <NumberChange>{change}</NumberChange>

        )
    }
    return null



}
