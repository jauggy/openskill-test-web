import React from "react";
import { IconTextButton } from "./IconTextButton";
/**
 * This button will fill up space
 */
interface Props {

    label: string,
    onPress: () => void,
    style?: any,
    color?: string,
    fullWidth?: boolean
}
export const TextButton = (props: Props) => {
    return (
        <IconTextButton {...props} />
    )
}
