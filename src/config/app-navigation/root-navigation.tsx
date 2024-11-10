import { NavigationContainerRef } from '@react-navigation/native';

export let navigatorRef: any;

export const setNavigator = (nav: NavigationContainerRef<any> | null) => {
  navigatorRef = nav;
};

export const getNavigator = () => navigatorRef as NavigationContainerRef<any>;
