import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeRouts} from './routes';
import {screenOption} from '../../../core/config/navigation';
import Home from '../screens/Home';
import WorkoutScreen from '../screens/Home/WorkoutScreen';

export type HomeNavigationParam = {
  [HomeRouts.HOME]: undefined;
  [HomeRouts.WORKOUT]: {id: number};
};

const Stack = createStackNavigator<HomeNavigationParam>();

const AppNavigation: FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName={HomeRouts.HOME}
      screenOptions={screenOption}>
      <Stack.Screen name={HomeRouts.HOME} component={Home} />
      <Stack.Screen name={HomeRouts.WORKOUT} component={WorkoutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
