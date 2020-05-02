import * as React from 'react';
import {
  View, Text, TouchableHighlight, Image, ScrollView, Button, ActivityIndicator, Alert, ColorPropType, SafeAreaView, TouchableOpacity, StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  SearchHomeScreen, NotificationScreen, ProfileScreen, globalStyles, ExitScreen, EditProfileScreen
} from '../components';
import HomeScreen from '../components/HomeTab/HomeScreen'
import { SvgXml } from 'react-native-svg';
import { backArrow, login, home, searchHome, notif, user, } from '../allSvg'
import { appColor, NoAvatar, w } from '../constants';
import { useGlobal, store } from '../store'
import { PROFILE, EXITScreen } from './routes';
import { Avatar, Divider, IconButton } from 'react-native-paper';
import { DrawerUserContent } from './drawerUserContent';
import NavigatorStack from '../index';
import { DrawerAdminContent } from './DrawerAdminContent';

// const { back, imageCont, imageIcon, button4, link, buttonTitle } = globalStyles
// const { userLogin, token } = store.state;


const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  const { icon } = styles
  return (
    <Tab.Navigator
      activeColor="#009999"
      barStyle={{ backgroundColor: '#fff' }}
    >
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
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Уведомления',
          tabBarIcon: ({ color }) => (
            <SvgXml xml={notif} style={icon} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color }) => (
            <SvgXml xml={user} style={icon} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
      <Drawer.Navigator 
      drawerPosition='right'
      edgeWidth={100}
      drawerContent={props => <DrawerAdminContent {...props} />}>
        <Drawer.Screen name="BottomTabs" component={BottomTabs} />
        <Drawer.Screen name="NavigatorStack" component={NavigatorStack} />
      </Drawer.Navigator>
  );
}

export default function NavigationUser() {
  return (
      <MainDrawer />
  );
}

const styles = StyleSheet.create({
icon: {
    width: 24,
    height: 24,
  },
})