import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

import {
  BellOutlineIcon,
  ClockOutlineIcon,
  HomeVariantIcon,
  MenuIcon,
} from '../assets/icons';
import HomeScreen from '../screens/HomeScreen';
import {SCREEN_NAMES} from '../util/constants';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2f3133',
          height: 50,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconContainer focused={focused}>
              <HomeVariantIcon
                width="24"
                height="24"
                fill={focused ? '#a7c7fa' : '#838788'}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.TAB_2}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconContainer focused={focused}>
              <ClockOutlineIcon
                width="24"
                height="24"
                fill={focused ? '#a7c7fa' : '#838788'}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.TAB_3}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconContainer focused={focused}>
              <BellOutlineIcon
                width="24"
                height="24"
                fill={focused ? '#a7c7fa' : '#838788'}
              />
            </TabIconContainer>
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.TAB_4}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconContainer focused={focused}>
              <MenuIcon
                width="24"
                height="24"
                fill={focused ? '#a7c7fa' : '#838788'}
              />
            </TabIconContainer>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TabIconContainer = styled.View<{focused: boolean}>`
  background-color: ${props => (props.focused ? '#32343a' : 'transparent')};
  padding: 5px 20px;
  border-radius: 20px;
`;
