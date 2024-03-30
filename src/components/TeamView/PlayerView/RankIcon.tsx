import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Player } from "services/types";
import { fontSizes } from "src/constants/fontSizes";

const icon1 = require('../../../assets/1.svg')
const icon2 = require('../../../assets/2.svg')
const icon3 = require('../../../assets/3.svg')
const icon4 = require('../../../assets/4.svg')
const icon5 = require('../../../assets/5.svg')
const icon6 = require('../../../assets/6.svg')
const icon7 = require('../../../assets/7.svg')
const icon8 = require('../../../assets/8.svg')


interface Props {
    data: Player,
    index: number
}

function getIcon(rank: number) {
    switch (rank + 1) {
        case 1:
            return icon1;
        case 2:
            return icon2;
        case 3:
            return icon3;
        case 4:
            return icon4;
        case 5:
            return icon5;
        case 6:
            return icon6;
        case 7:
            return icon7;
        case 8:
            return icon8;
        default:
            return null
    }
}

export const RankIcon = (props: Props) => {


    return (
        <View style={{ ...styles.container }}>
            <Image source={getIcon(props.data.rank)} style={styles.image} resizeMode='contain' />
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    text: {
        fontSize: fontSizes.normal,

    },
    nameColumn: {
        width: 200
    },
    image: {
        width: 16,
        height: 16,
    }
})