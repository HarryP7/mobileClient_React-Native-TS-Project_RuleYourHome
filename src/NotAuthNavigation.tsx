import * as React from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, 
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {
  SearchHomeScreen, ProfileScreen, AuthScreen, RegistrationScreen, globalStyles
} from './components';
import HomeScreen from './components/HomeTab/HomeScreen'
import { SvgXml } from 'react-native-svg';
import { backArrow, login, home, searchHome, notif, menu, search, write } from './allSvg'
import { ColorApp } from './constants';
import { Icon } from 'react-native-elements';
import { AUTH, REGISTRATION } from './routes';

const { headDrawer, icon, back, imageIcon, imageCont, button4, link, buttonTitle } = globalStyles

const BottomTab = createBottomTabNavigator({
  SearchHome: {
    screen: SearchHomeScreen,
    navigationOptions: { tabBarLabel: 'Поиск дома' },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: { tabBarLabel: 'Дом' },
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
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
      <View style={headDrawer}>
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={back}>
            <SvgXml xml={backArrow} width="20" height="20"  /> 
        </TouchableOpacity>
        <Image
          source={require('../icon/user1.png')}
          style={[imageIcon, imageCont]} />

        <View style={button4}>
          {/* <SvgXml xml={login} style={icon} /> */}
          <View style={{width:10}}></View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(AUTH)}>
            <View style={link}>
              <Text style={buttonTitle}>Вход  |</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(REGISTRATION)}>
            <View style={link}>
              <Text style={buttonTitle}>Регистрация</Text>
            </View>
          </TouchableOpacity>
          <View style={{width:10}}></View>
        </View>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

export const MainDrawer = createDrawerNavigator({
  Tab: {
    screen: BottomTabStack,
    navigationOptions: {
      drawerLabel: ' ',
      // drawerIcon: () =>
      //   <SvgXml xml={backArrow} width="20" height="20" style={back} />
    }
  },
  // Profile: {
  //   screen: ProfileScreen,
  //   navigationOptions: {
  //     drawerLabel: ' ',
  //     drawerIcon: () => <Image
  //       source={require('../icon/user1.png')}
  //       style={imageIcon} />
  //   }
  // },
  // Auth: {
  //   screen: AuthScreen,
  //   navigationOptions: {
  //     drawerLabel: 'Вход',
  //     drawerIcon: () => <SvgXml xml={login} style={icon} />
  //   },
  // },
  // Registretion: {
  //   screen: RegistrationScreen,
  //   navigationOptions: {
  //     drawerLabel: 'Регистрация',
  //     drawerIcon: () => <SvgXml xml={write} style={icon} />//<Icon name="library-books" size={25}></Icon> //library-books, data-usage
  //   },
  // },
}, {
  drawerBackgroundColor: ColorApp,
  drawerType: 'slide',
  drawerWidth: 220,
  swipeDistanceThreshold: 100,
  contentOptions: {
    itemConteinerStyle: {
      marginVertical: 10
    }
  },
  contentComponent: CustomDrowerComponent
});

const NotAuthNavigation = createStackNavigator(
  {
    Drawer: MainDrawer,
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

export default createAppContainer(NotAuthNavigation);
