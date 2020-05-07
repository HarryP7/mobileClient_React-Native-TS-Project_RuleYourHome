import * as React from 'react';
import {  StyleSheet, } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {  SearchHomeScreen, AuthScreen, } from '../components';
import { SvgXml } from 'react-native-svg';
import { user, searchHome } from '../allSvg'
import { appColor } from '../constants';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  const { icon } = styles
  return (
    <Tab.Navigator
      activeColor={appColor}
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="SearchHome"
        component={SearchHomeScreen}
        options={{
          tabBarLabel: 'Поиск дома',
          tabBarIcon: ({ color }) => (
            <SvgXml xml={searchHome} style={icon} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          tabBarLabel: 'Вход',
          tabBarIcon: ({ color }) => (
            <SvgXml xml={user} style={icon} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function NotAuthNavigation() {
  return (
      <MyTabs />
  );
}

const styles = StyleSheet.create({
icon: {
    width: 24,
    height: 24,
  },
})

export {NotAuthNavigation}
