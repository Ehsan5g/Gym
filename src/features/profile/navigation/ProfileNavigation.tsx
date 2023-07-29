import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthRouts} from './routes';
import {screenOption} from '../../../core/config/navigation';
import Profile from '../screens/Profile';

export type AuthNavigationParam = {
  [AuthRouts.PROFILE]: undefined;
};

const Stack = createStackNavigator<AuthNavigationParam>();

const AppNavigation: FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthRouts.PROFILE}
      screenOptions={screenOption}>
      <Stack.Screen name={AuthRouts.PROFILE} component={Profile} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
