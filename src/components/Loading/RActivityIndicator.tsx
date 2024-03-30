import { HeaderText } from "components/Typography/HeaderText"
import React from "react"
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

interface Props {
    label?: string
}
export const RActivityIndicator = (props: Props) => {
    const label = props.label ? props.label : "Loading..."
    return (
        <View>
            <ActivityIndicator animating={true} size={40} />
            <View style={{ height: 30 }} />
            <HeaderText>{label}</HeaderText>
        </View>
    )
}