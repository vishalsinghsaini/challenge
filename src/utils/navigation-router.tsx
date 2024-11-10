import { NavigationContainerRef, TabActions } from '@react-navigation/native';

export interface Params {
  isResetNavigation?: boolean
}

export interface Route {
  name: string
  params?: object
}

const checkIsResetNavigation = (params: Params = {}) => params?.isResetNavigation;

export const navigationRouter = (newRoutes: Route[], navigation: NavigationContainerRef<any>) => {
  if (newRoutes.length === 1) {
    const screenName = newRoutes[0].name;
    const isResetNavigation = checkIsResetNavigation(newRoutes[0].params);
    if (isResetNavigation) {
      navigation.reset({
        index: newRoutes.length - 1,
        routes: newRoutes,
      });
      return;
    }
    navigation.navigate(screenName, newRoutes[0].params);
    return;
  }

};

