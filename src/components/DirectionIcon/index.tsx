import { RText } from "components/Typography/RText";
import { colors } from "constants/colors";
import { fontSizes } from "constants/fontSizes";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    ratingChange?: number
}

export const DirectionIcon = (props: Props) => {
    if (!props.ratingChange) {
        return null;
    }

    if (props.ratingChange < 0) {
        return (
            <View style={styles.container}>
                <RText containerStyle={styles.text}> (</RText>
                <Icon style={styles.icon} name={"arrow-down-thin"} color={colors.error} size={fontSizes.buttonIcon} />
                <RText containerStyle={styles.text}>{props.ratingChange.toFixed(2)})</RText>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <RText containerStyle={styles.text}>(</RText>

            <Icon style={styles.icon} name={"arrow-up-thin"} color={colors.success} size={fontSizes.buttonIcon} />
            <RText containerStyle={styles.text}>{props.ratingChange.toFixed(2)})</RText>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 4
    },
    text: {
    },
    icon: {
        transform: [{ translateY: -2 }],
        marginHorizontal: -4
    }
})
