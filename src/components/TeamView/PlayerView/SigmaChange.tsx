import React from "react";
import { Player } from "services/types";
import { NumberChange } from "../NumberChange";

interface Props {
    data: Player,
    index: number
}

export const SigmaChange = (props: Props) => {

    if (props.data.newRating) {
        const newSigma = props.data.newRating.sigma
        const change = newSigma - props.data.uncertainty
        return (

            <NumberChange weak>{change}</NumberChange>

        )
    }
    return null



}
