import * as React from 'react';
import {
  View, Text, TouchableHighlight, Image, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {
  SearchHomeScreen, AddHomeScreen, NotificationScreen, ProfileScreen, AuthScreen, 
  globalStyles, ExitScreen
} from './components';
import HomeScreen from './components/HomeTab/HomeScreen' 
import { SvgXml } from 'react-native-svg';
import { backArrow, login, addHome, home, searchHome, notif, menu, search } from './allSvg'
import { ColorApp } from './constants';
import { useGlobal, store } from './store'
import { PROFILE } from './routes';

const { headDrawer, icon, back, imageIcon, imageCont, link, buttonTitle, button4 } = globalStyles
const { userLogin, token } = store.state;

const BottomTab = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: { tabBarLabel: 'Дом' },
  },
  SearchHome: {
    screen: SearchHomeScreen,
    navigationOptions: { tabBarLabel: 'Поиск дома' },
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions: { tabBarLabel: 'Уведомления' },
  },
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        var { routeName } = navigation.state;
        return <SvgXml xml={
          routeName === 'Home' ? home : routeName === 'SearchHome' ?
          searchHome : routeName === 'Notification' ? notif : ''}
          style={icon} fill={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: ColorApp,
      inactiveTintColor: 'gray',
    },
  }
);

const BottomTabStack = createStackNavigator({
  BottomTabStack: { screen: BottomTab },
},
  { headerMode: 'none', }
);

const CustomDrowerComponent = (props: any) => (
  <SafeAreaView >
    <ScrollView>
      <View style={headDrawer}>
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={back}>
          <SvgXml xml={backArrow} width="20" height="20" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(PROFILE)}
          style={imageCont}>
          <Image
            source={userLogin.avatar ? { uri: userLogin.avatar.url } : require('../icon/user1.png')}
            style={imageIcon} />
        </TouchableOpacity>

        <View style={button4}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(PROFILE)}>
            <View style={link}>
              <Text style={buttonTitle}>{userLogin.fullName}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const MainDrawer = createDrawerNavigator({
  Tab: {
    screen: BottomTabStack,
    navigationOptions: {
      drawerLabel: 'Дом',
      drawerIcon: ({tintColor}) => <SvgXml xml={home} style={icon} fill={tintColor} /> 
    }
  },
  AddHome: {
    screen: AddHomeScreen,
    navigationOptions: {
      drawerLabel: 'Добавить дом',
      drawerIcon: () => <SvgXml xml={addHome} style={icon} />
    }
  },
  Auth: {
    screen: ExitScreen,
    navigationOptions: {
      drawerLabel: 'Выход',
      drawerIcon: () => <SvgXml xml={login} style={icon} />
    },
  },
}, {
  //initialRouteName: 'Tab',
  drawerBackgroundColor: ColorApp,
  //drawerPosition: 'right',
  drawerType: 'slide',
  drawerWidth: 220,
  swipeDistanceThreshold: 100,
  contentOptions: {
    itemConteinerStyle: {
      marginVertical: 10
    },
    activeTintColor: 'white',
  },
  contentComponent: CustomDrowerComponent
});

const MainNavigation = createStackNavigator(
  {
    Drawer: MainDrawer,
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

export default createAppContainer(MainNavigation);
