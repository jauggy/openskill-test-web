import { BottomMessageText } from "components/BottomMessage/BottomMessageText";
import { colors } from "constants/colors";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { hideMessage, resetMessageState } from "reducers/bottomMessage";
import { RootState, store } from 'reducers/store';

export const BottomMessage = () => {
    const animationState = useSelector((state: RootState) => state.bottomMessage.animationState);
    const level = store.getState().bottomMessage.level;
    const message = store.getState().bottomMessage.message;

    const [componentHeight, setComponentHeight] = useState(0);
    const animationValue = useRef(new Animated.Value(0)).current;

    const dispatch = useDispatch();

    const onLayout = (event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        setComponentHeight(height);

    }

    useEffect(() => {
        if (animationState == 'forward') {
            console.log("Forward animation")
            Animated.timing(animationValue, {
                useNativeDriver: true,
                duration: 400,
                toValue: 1
            }).start(() => {

            })

        } else if (animationState == 'reverse') {
            console.log("Reversing animation")
            Animated.timing(animationValue, {
                useNativeDriver: true,
                duration: 400,
                toValue: 0,
            }).start(() => {
                //On finish 
                dispatch(resetMessageState())

            })
        }

    }, [animationState])


    const onPress = () => {
        dispatch(hideMessage())
    }
    const visibility = animationState === 'default' ? 0 : 1
    let translateY;
    if (animationState === 'forward') {
        /**
         * When animating forward we don't know the component height so just use a fixed value
         */
        translateY = animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0]
        })
    } else {
        translateY = animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [componentHeight, 0]
        })
    }

    const transform = [{ translateY: translateY }]

    const borderColor = level === 'error' ? colors.themeDarkRed : colors.themeDarkGreen

    return (
        <View style={styles.bottomContainer} pointerEvents="box-none">

            <Pressable onPress={onPress}>
                <Animated.View onLayout={onLayout}
                    style={{
                        ...styles.textContainer,
                        opacity: visibility,
                        transform: transform,
                        borderColor: borderColor
                    }}>
                    <BottomMessageText>
                        {message}
                    </BottomMessageText>

                </Animated.View>
            </Pressable>


        </View >

    )


}
const styles = StyleSheet.create({
    bottomContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    textContainer: {
        borderWidth: 2,
        backgroundColor: 'white'
    }
})
