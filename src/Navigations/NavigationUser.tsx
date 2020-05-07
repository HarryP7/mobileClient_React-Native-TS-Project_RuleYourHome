import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {  SearchHomeScreen, NotificationScreen, ProfileScreen, AdvertList, } from '../components';
import { SvgXml } from 'react-native-svg';
import { searchHome, notif, user, } from '../allSvg'
import NavigatorStack from '../index';
import { DrawerAdminContent } from './DrawerAdminContent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { appColor } from '../constants';


const Tab = createMaterialBottomTabNavigator();

function BottomTabs() {
  const { icon } = styles
  return (
    <Tab.Navigator
    activeColor={appColor}
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="NewsOfHome"
        component={AdvertList}
        options={{
          tabBarLabel: 'Объявления',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="newspaper" color={color} size={24} />
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
      drawerType='slide'
      // overlayColor="transparent"
      drawerContent={props => <DrawerAdminContent {...props} />}>
        <Drawer.Screen name="BottomTabs" component={BottomTabs} />
        <Drawer.Screen name="NavigatorStack" component={NavigatorStack} />
      </Drawer.Navigator>
  );
}

function NavigationUser() {
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

export {NavigationUser}