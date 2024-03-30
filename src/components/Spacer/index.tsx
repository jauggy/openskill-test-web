import { measurementConstants } from "constants/measurementConstants";
import React from "react";
import { View } from "react-native";

interface Props {
    small?: boolean,
    height?: number
}
export const Spacer = (props: Props) => {
    const defaultHeight = measurementConstants.formComponentMarginBottom;
    const height = props.height ? props.height : (props.small ? defaultHeight / 2 : defaultHeight)
    return <View style={{ height: height }}></View>
}