import { RLink } from "components/Buttons/RLink";
import { ModalPicker } from "components/ModalPicker";
import { colors } from "constants/colors";
import { fontSizes } from "constants/fontSizes";
import { measurementConstants } from "constants/measurementConstants";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { pickByLeader } from "src/balanceAlgos/pickByLeader";
import { splitOneChevs } from "src/balanceAlgos/splitOneChevs";
import { BalanceAlgo } from "src/balanceAlgos/types";
import { stringUtil } from "util/stringUtil";

interface Props {
    onAlgoSelected: (algo: BalanceAlgo) => void
    algo: BalanceAlgo
}

const options: BalanceAlgo[] = [splitOneChevs, pickByLeader];
const optionLabels = options.map(x => x.name)

export const AlgoSelect = (props: Props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);

    }

    const dismissModal = () => {
        setModalVisible(false);
    }

    const onOptionSelected = (option: string, index: number) => {
        const algo = options[index]
        setModalVisible(false);

        props.onAlgoSelected(algo);
    }



    return (
        <View style={styles.container} >

            <RLink onPress={openModal} label={stringUtil.toTitleCase(props.algo.name)}></RLink>

            <ModalPicker onOptionSelected={onOptionSelected} options={optionLabels}
                isVisible={modalVisible} onCancel={dismissModal} heading={"Select Balance Algo"} />
        </View>
    )
}


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1, backgroundColor: 'black', opacity: 0.7
    },
    modalWhite: {
        height: 200, width: '100%', backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    option: {
        paddingVertical: 16
    },
    textInput: {
        fontSize: 20,
        fontFamily: 'RobotoCondensed-Bold',
        color: colors.black,
        paddingTop: 0,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.themeDarkGrey,
    },
    container: {
        marginBottom: measurementConstants.formComponentMarginBottom
    },
    label: {
        fontFamily: 'RobotoCondensed-Light',
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iconContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    placeholder: {
        fontSize: fontSizes.xSmall
    },
    pickerText: {
        fontSize: fontSizes.normal
    }
})