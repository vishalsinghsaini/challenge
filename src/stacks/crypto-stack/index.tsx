import { navigations } from '@/src/config/app-navigation/constant'
import { Home } from '@/src/screens/home'
import { Product } from '@/src/screens/product'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator()
const CryptoStack = (props: any) => {
    const initialRouteName = navigations.HOME
    const header = () => null;

    return (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ header }}>
            <Stack.Screen name={navigations.HOME} component={Home} />
            <Stack.Screen name={navigations.PRODUCT} component={Product} />
        </Stack.Navigator>
    )
}

export default CryptoStack