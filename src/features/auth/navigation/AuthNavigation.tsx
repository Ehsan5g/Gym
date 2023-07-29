import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthRouts} from './routes';
import {screenOption} from '../../../core/config/navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';

export type AuthNavigationParam = {
  [AuthRouts.LOGIN]: undefined;
  [AuthRouts.REGISTER]: undefined;
};

const Stack = createStackNavigator<AuthNavigationParam>();

const AppNavigation: FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthRouts.LOGIN}
      screenOptions={screenOption}>
      <Stack.Screen name={AuthRouts.LOGIN} component={Login} />
      <Stack.Screen name={AuthRouts.REGISTER} component={Register} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
