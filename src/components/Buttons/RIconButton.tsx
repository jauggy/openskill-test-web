import { colors } from "constants/colors";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    onPress: () => void,
    icon: string,
    color?: string,
    size?: number
}

const slop = {
    top: 20,
    bottom: 20,
    right: 20,
    left: 20
}


export const RIconButton = (props: Props) => {
    const color = props.color ? props.color : colors.themeDarkGrey
    const size = props.size ? props.size : 30
    return (
        <TouchableOpacity onPress={props.onPress} hitSlop={slop}  >
            <Icon name={props.icon} size={size} color={color} />
        </TouchableOpacity>
    )
}

