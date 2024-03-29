import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouts} from './routes';
import {screenOption} from '../../core/config/navigation';
import SplashScreen from '../../features/splash/screens';
import AuthNavigation from '../../features/auth/navigation';
import TabNavigation from '../../features/TabNavigator/navigation/TabNavigation';

export type AppNavigationParam = {
  [AppRouts.TAB_NAVIGATOR]: undefined;
  [AppRouts.AUTH]: undefined;
  [AppRouts.SPLASH_SCREEN]: undefined;
};

const Stack = createStackNavigator<AppNavigationParam>();

const AppNavigation: FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRouts.SPLASH_SCREEN}
      screenOptions={screenOption}>
      <Stack.Screen name={AppRouts.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={AppRouts.AUTH} component={AuthNavigation} />
      <Stack.Screen name={AppRouts.TAB_NAVIGATOR} component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
