import React from "react";
import { Player } from "services/types";
import { NumberChange } from "../NumberChange";

interface Props {
    data: Player,
    index: number
}

export const MuChange = (props: Props) => {

    if (props.data.newRating) {
        const newOs = props.data.newRating.mu - props.data.newRating.sigma
        const osChange = newOs - (props.data.skill - props.data.uncertainty)
        return (

            <NumberChange>{osChange}</NumberChange>

        )
    }
    return null



}
