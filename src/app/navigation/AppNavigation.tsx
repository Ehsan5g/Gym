import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRouts} from './routes';
import {screenOption} from 'core/config/navigation';
import SplashScreen from 'features/splash/screens';
import Login from '../../features/auth/screens/Login';

export type AuthNavigationParam = {
  [AppRouts.TAB_NAVIGATOR]: undefined;
  [AppRouts.AUTH]: undefined;
  [AppRouts.SPLASH_SCREEN]: undefined;
};

const Stack = createStackNavigator<AuthNavigationParam>();

const AppNavigation: FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRouts.SPLASH_SCREEN}
      screenOptions={screenOption}>
      <Stack.Screen name={AppRouts.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={AppRouts.AUTH} component={Login} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
