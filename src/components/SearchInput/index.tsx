import { measurementConstants } from "constants/measurementConstants";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RIconButtonFlex } from "./RIconButtonFlex";
import { RTextInputOutlined } from "./RTextInputOutlined";

interface Props {
    onSearch?: (text) => void,
    searchText?: string,
    placeholder?: string
}
export const SearchInput = (props: Props) => {
    const [searchField, setSearchField] = useState(props.searchText ? props.searchText : '');


    const onPressRemoveFilter = () => {
        setSearchField('')
    }



    const onPressMagnifyButton = (search: string) => {
        console.log(search)
        if (search) {

            props.onSearch(search);

        } else if (props.placeholder) {
            props.onSearch(props.placeholder)
        }

    }


    const isCrossVisible = searchField.length > 0

    return (

        <View style={styles.container}>
            <RTextInputOutlined
                placeholder={props.placeholder}
                onPressIcon={onPressRemoveFilter}
                onChangeText={setSearchField}
                value={searchField} icon="close"
                isIconVisible={isCrossVisible} />
            <RIconButtonFlex icon="magnify" onPress={() => onPressMagnifyButton(searchField)} />
        </View>

    )




}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        width: '100%',
        height: measurementConstants.buttonHeight
    },
})
