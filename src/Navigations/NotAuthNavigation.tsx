import * as React from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StyleSheet, 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  SearchHomeScreen, ProfileScreen, AuthScreen, RegistrationScreen, globalStyles
} from '../components';
import HomeScreen from '../components/HomeTab/HomeScreen'
import { SvgXml } from 'react-native-svg';
import { backArrow, login, home, searchHome, notif, menu, search, write } from '../allSvg'
import { appColor } from '../constants';
import { AUTH, REGISTRATION } from './routes';

// const {  icon, back, imageIcon, imageCont, button4, link, buttonTitle } = globalStyles

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  const { icon } = styles
  return (
    <Tab.Navigator
      activeColor="#009999"
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Дом',
          tabBarIcon: ({ color }) => (
            <SvgXml xml={home} style={icon} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function NotAuthNavigation() {
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
