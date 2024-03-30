import { Dimensions } from "react-native";


export const dimensionsUtil = {
    getScreenWidth: () => {
        const window = Dimensions.get("window");

        return window.width;
    },
    getScreenHeight: () => {
        const window = Dimensions.get("window");

        return window.height
    }
}