import { RLink } from "components/Buttons/RLink";
import { InputLabel } from "components/InputLabel";
import { ModalPicker } from "components/ModalPicker";
import { colors } from "constants/colors";
import { fontSizes } from "constants/fontSizes";
import { measurementConstants } from "constants/measurementConstants";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    label: string,
    value: string,
    onOptionSelected: (option: string, index: number) => void,
    options: string[],
    icon: string,
    placeholder?: string
}


export const ModalPickerFormComponent = (props: Props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);

    }

    const dismissModal = () => {
        setModalVisible(false);
    }

    const onOptionSelected = (option: string, index: number) => {
        props.onOptionSelected(option, index);
        setModalVisible(false);
    }


    const label = props.value ? props.value : props.placeholder

    return (
        <View style={styles.container} >

            <InputLabel {...props} />
            <Pressable onPress={openModal}>
                <View style={styles.row}>
                    <RLink label={label} onPress={openModal} />
                    <View style={{ flex: 1 }} />
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name={props.icon} color={colors.themeLightGrey} size={26} />

                    </View>

                </View>
            </Pressable>
            <ModalPicker onOptionSelected={onOptionSelected} options={props.options}
                isVisible={modalVisible} onCancel={dismissModal} heading={props.placeholder} />
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

    container: {
        paddingBottom: 5,
        marginBottom: measurementConstants.formComponentMarginBottom
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