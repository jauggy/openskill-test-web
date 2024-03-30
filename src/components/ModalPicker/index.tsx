import { ModalButton } from "components/ModalPicker/ModalButton";
import { RText } from "components/Typography/RText";
import { RWeakText } from "components/Typography/RWeakText";
import { colors } from "constants/colors";
import { measurementConstants } from "constants/measurementConstants";
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Modal, Platform, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dimensionsUtil } from "util/dimensionsUtil";

const BORDER_RADIUS = measurementConstants.modalButtonBorderRadius

interface Props {
    onOptionSelected: (option: string, index: number) => void,
    options: string[],
    heading?: string,
    isVisible: boolean,
    onCancel: () => void
}

type AnimationState = 'forward' | 'backward' | 'finished'

export const ModalPicker = (props: Props) => {
    const animationValue = useRef(new Animated.Value(0)).current;
    const [animationState, setAnimationState] = useState<AnimationState>('finished')
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (props.isVisible) {
            setAnimationState('forward')
        } else {
            if (animationState === 'forward') {
                setAnimationState('backward')

            }
        }


    }, [props.isVisible, animationState])

    useEffect(() => {
        if (animationState === 'forward') {
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        } else if (animationState === 'backward') {
            if (Platform.OS === 'ios') {
                Animated.timing(animationValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start(() => {
                    setAnimationState('finished')
                });
            } else {
                setAnimationState('finished')
            }


        } else if (animationState === 'finished') {
            animationValue.setValue(0);
        }
    }, [animationState])

    const getListHeight = () => {
        return dimensionsUtil.getScreenHeight() - insets.top - insets.bottom - 100
    }


    const closeModal = () => {

        props.onCancel();

    }

    const onChange = (index: number) => {
        props.onOptionSelected(props.options[index], index)

    }

    const getPlaceholder = () => {
        if (props.heading) {
            return props.heading
        } else {
            return "Please select"
        }
    }


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.linkBorder} >
                <TouchableOpacity onPress={() => onChange(index)} style={styles.pressableContainer}>
                    <RText systemFont color={colors.primary}>{(item)} </RText>
                </TouchableOpacity>

            </View>

        )
    }
    const keyExtractor = (item, index) => {
        return index.toString()
    }

    const renderListHeader = () => {
        return (
            <RWeakText systemFont small containerStyle={styles.header}>{getPlaceholder().toUpperCase()}</RWeakText>

        )
    }

    const startY = dimensionsUtil.getScreenHeight();

    const translateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [startY, 0]
    })
    const transform = [{ translateY: translateY }]
    if (animationState === 'finished') {
        return null;
    }
    return (
        <Modal visible={true}
            animationType="fade"
            transparent={true} presentationStyle="overFullScreen">

            <Pressable style={styles.modalBackground} onPress={closeModal}>
                <Animated.View style={{ ...styles.modalContainer, maxHeight: getListHeight(), transform: transform }}>

                    <View style={{ ...styles.roundedWhite, }}>
                        <FlatList data={props.options}
                            ListHeaderComponent={renderListHeader}
                            renderItem={renderItem} keyExtractor={keyExtractor} />
                    </View>
                    <ModalButton onPress={closeModal} label="Cancel" />




                </Animated.View>


            </Pressable>

        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        marginBottom: measurementConstants.formComponentMarginBottom

    },
    modalBackground: {
        flex: 1,
        backgroundColor: colors.modalBackground,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 4
    },
    modalContainer: {
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        flex: 1,
    },
    roundedWhite: {
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS,
        marginBottom: 4,
        overflow: 'hidden',
        minWidth: 400

    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    header: {
        marginTop: 30,
        marginBottom: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS
    },
    pressableText: {
        marginTop: 20,
        paddingLeft: 20
    },
    flatListContainer: {
        paddingBottom: 40//IOS Hack https://stackoverflow.com/questions/46196242/react-native-flatlist-last-item-visibility-issue
    },
    linkBorder: {
        borderTopWidth: 1,


        borderColor: colors.lineSeperator,

    },
    pressableContainer: {
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    bottomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
        paddingTop: 20,
    }
})