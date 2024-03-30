
import color from 'color';
import { configureFonts, DefaultTheme } from 'react-native-paper';
import { colors } from './colors';
import { fontConfig } from './fontConfig';

/**
 * Copied from https://github.com/callstack/react-native-paper/blob/main/src/styles/DefaultTheme.tsx
 */
const black = '#000000';
const white = '#ffffff';
const pinkA400 = '#f50057';

const customTheme = {
    ...DefaultTheme,
    dark: false,
    roundness: 1,
    colors: {
        primary: colors.primary,
        accent: colors.primary,
        background: 'white',
        surface: white,
        error: '#B00020',
        text: black,
        onSurface: '#000000',
        disabled: color(black).alpha(0.26).rgb().string(),
        placeholder: color(black).alpha(0.54).rgb().string(),
        backdrop: color(black).alpha(0.5).rgb().string(),
        notification: pinkA400,
    },
    //@ts-ignore
    fonts: configureFonts(fontConfig),
    animation: {
        scale: 1.0,
    },
};

export { customTheme };
