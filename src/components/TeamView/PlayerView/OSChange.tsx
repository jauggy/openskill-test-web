import React from "react";
import { Player } from "services/types";
import { NumberChange } from "../NumberChange";

interface Props {
    data: Player,
    index: number
}

export const OSChange = (props: Props) => {

    if (props.data.newRating) {
        const newRating = props.data.newRating.mu - props.data.newRating.sigma
        const change = newRating - (props.data.skill - props.data.uncertainty)
        return (

            <NumberChange>{change}</NumberChange>

        )
    }
    return null



}
