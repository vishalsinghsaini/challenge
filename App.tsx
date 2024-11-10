import { StatusBar, SafeAreaView, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import { registerRootComponent } from 'expo'
import { Provider } from "react-redux";
import { ThemeProps } from './src/theme/theme';
import { useAppTheme } from './src/app-hooks/use-app-theme';
import store from './src/store/store';
import OrderBook from './src/components/orderBook';
import Controls from './src/components/controls';

const App = () => {
    const { theme } = useAppTheme();
    const styles = createStyleSheet(theme);
    LogBox.ignoreAllLogs()
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container} />
            <StatusBar barStyle='dark-content' backgroundColor={'white'} />
            <Controls />
            <OrderBook />
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