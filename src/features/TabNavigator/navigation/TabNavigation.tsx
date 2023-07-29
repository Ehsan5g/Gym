import React, {FunctionComponent} from 'react';
import {TabRoutes} from './routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileNavigator from '../../profile/navigation';
import Icon from '../../../core/components/Icon';
import HomeNavigator from '../../home/navigation';
import {color} from '../../../core/config/color';
import bmi from '../../bmi/navigation';

export type TabNavigationParam = {
  [TabRoutes.HOME_NAVIGATION]: undefined;
  [TabRoutes.PROFILE_NAVIGATION]: undefined;
  [TabRoutes.BMI_NAVIGATION]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParam>();

const TabNavigation: FunctionComponent = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: color.primary, flex: 1}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          backgroundColor: color.primary,
        },
        tabBarActiveTintColor: color.secondary,
        tabBarInactiveTintColor: color.textSecondary,
        tabBarLabelPosition: 'below-icon',
        lazy: true,
      }}
      initialRouteName={TabRoutes.HOME_NAVIGATION}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon size={25} name={'home'} color={color} />
          ),
        }}
        name={TabRoutes.HOME_NAVIGATION}
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'BMI',
          tabBarIcon: ({color}) => (
            <Icon name={'chart-pie'} size={25} color={color} />
          ),
        }}
        name={TabRoutes.BMI_NAVIGATION}
        component={bmi}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name={'account'} size={25} color={color} />
          ),
        }}
        name={TabRoutes.PROFILE_NAVIGATION}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
