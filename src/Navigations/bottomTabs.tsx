import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useIsFocused, RouteProp } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import overlay from './overlay';
import { Feed } from './feed';
import { Message } from './message';
import { Notifications } from './notifications';
import { StackNavigatorParamlist } from './types';
import { appColor } from '../constants';
import HomeScreen from '../components/HomeTab/HomeScreen';
import { SvgXml } from 'react-native-svg';
import { home, searchHome, user } from '../allSvg';
import { StyleSheet } from 'react-native';
import { SearchHomeScreen, ProfileScreen } from '../components';

const Tab = createMaterialBottomTabNavigator();

type Props = {
  route: RouteProp<StackNavigatorParamlist, 'FeedList'>;
};

export const BottomTabs = (props: Props) => {
    const { iconSt } = styles
  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : 'Feed';

  const theme = useTheme();
  const safeArea = useSafeArea();
  const isFocused = useIsFocused();

  let icon = 'feather';

  switch (routeName) {
    case 'Message':
      icon = 'email-plus-outline';
      break;
    default:
      icon = 'feather';
      break;
  }

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface;

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={appColor}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Дом"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
                <SvgXml xml={home} style={iconSt} fill={color} />      
              ),
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="SearchHome"
          component={SearchHomeScreen}
          options={{
            tabBarLabel: 'Поиск дома',
            tabBarIcon: ({ color }) => (
              <SvgXml xml={searchHome} style={iconSt} fill={color} />
            ),
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="Уведомления"
          component={Notifications}
          options={{
            tabBarIcon: 'bell',
            tabBarColor,
          }}
        />
        {/* <Tab.Screen
          name="Message"
          component={Message}
          options={{
            tabBarIcon: 'message-text-outline',
            tabBarColor,
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ color }) => (
              <SvgXml xml={user} style={iconSt} fill={color} />
            ),
            tabBarColor,
          }}
        />
      </Tab.Navigator>
      {/* <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: 'absolute',
            bottom: safeArea.bottom + 65,
            right: 16,
          }}
          color="white"
          theme={{
            colors: {
              accent: appColor,
            },
          }}
          onPress={() => {}}
        />
      </Portal> */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
iconSt: {
    width: 24,
    height: 24,
  },
})