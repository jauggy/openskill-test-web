import { InputLabel } from "components/InputLabel";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RTextInputOutlined } from "./RTextInputOutlined";

interface Props {
    label: string
    placeholder?: string,
    value: string,
    setValue: (newValue: string) => void
}
export const RTextInput = (props: Props) => {




    return (

        <View style={styles.container}>
            <InputLabel label={props.label} />
            <RTextInputOutlined
                placeholder={props.placeholder}
                onChangeText={props.setValue}
                value={props.value} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
    },
})
