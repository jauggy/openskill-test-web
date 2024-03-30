import { registerRootComponent } from 'expo';
import { Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { Provider } from 'react-redux';
import { store } from 'src/reducers/store';
import App from './App';
import { customTheme } from './src/constants/theme';

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider theme={customTheme}>
                <App />
            </PaperProvider >

        </Provider>

    )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);

if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}