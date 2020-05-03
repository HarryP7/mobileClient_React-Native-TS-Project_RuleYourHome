import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import { StackNavigator } from './stack';
import { DrawerAdminContent } from './DrawerAdminContent';

const Drawer = createDrawerNavigator();

export const NavigationAdmin = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    // <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        drawerPosition='right'
        edgeWidth={100}
        drawerStyle={{
          // backgroundColor: '#c6cbef',
          width: 240,
        }}
        drawerType='slide'
        // overlayColor="transparent"
        drawerContent={props => <DrawerAdminContent {...props} />}>
        <Drawer.Screen name="Home" component={StackNavigator} />
      </Drawer.Navigator>
    // </NavigationContainer>
  );
};