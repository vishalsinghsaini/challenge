import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { navigations } from './constant';
import CryptoStack from '@/src/stacks/crypto-stack';

export interface AppNavigationProps {
  initialScreen?: string
}

export const AppNavigation = (props: AppNavigationProps) => {
  const { initialScreen = navigations.CRYPTOSTACK } = props
  const AppStack = createStackNavigator()
  const dispatch = useDispatch()
  const header = () => null;

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer
          independent={true}
          ref={(_: NavigationContainerRef<any>) => {
          }}
        >
          <AppStack.Navigator initialRouteName={initialScreen} screenOptions={{ header }}>
            <AppStack.Screen name={navigations.CRYPTOSTACK} component={CryptoStack} />
          </AppStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  )
}
