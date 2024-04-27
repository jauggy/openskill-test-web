import React from "react";
import { Player } from "services/types";
import { NumberChange } from "../NumberChange";

interface Props {
    data: Player,
    index: number
}

export const MuChange = (props: Props) => {

    if (props.data.newRating) {
        const newMu = props.data.newRating.mu
        const osChange = newMu - (props.data.skill)
        return (

            <NumberChange>{osChange}</NumberChange>

        )
    }
    return null



}
