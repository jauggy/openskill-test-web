import { RActivityIndicatorFlex } from "components/Loading/RActivityIndicatorFlex";
import { HeaderTextFlex } from "components/Typography/HeaderTextFlex";
import React from "react";
import { View } from "react-native";

interface Props {
    isLoading: boolean,
    children: any,
    noData?: boolean
}

export const LoadableContent = (props: Props) => {
    if (props.noData) {
        return <HeaderTextFlex>No results found</HeaderTextFlex>
    }

    if (!props.isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {props.children}
            </View>
        )
    }

    return (
        <RActivityIndicatorFlex label="Loading..." />
    )




}
