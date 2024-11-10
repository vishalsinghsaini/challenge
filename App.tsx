import { StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { registerRootComponent } from 'expo'
import { Provider } from "react-redux";
import { AppNavigation } from './src/config/app-navigation';
import { ThemeProps } from './src/theme/theme';
import { useAppTheme } from './src/app-hooks/use-app-theme';
import { store } from './src/network/reducers/store';

const App = () => {
    const { theme } = useAppTheme();
    const styles = createStyleSheet(theme);

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container} />
            <StatusBar barStyle='dark-content' backgroundColor={'white'} />
            <AppNavigation />
        </Provider>
    )
}

const createStyleSheet = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.white
        },
    });

export default registerRootComponent(App)