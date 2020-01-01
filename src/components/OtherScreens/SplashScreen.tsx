import React from 'react';
import {
  View, Text, TouchableOpacity, Image, Button,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NotAuthNavigation from '../..';
import NavigationUser from '../../NavigationUser';
import NavigationAdmin from '../../NavigationAdmin';
import { globalStyles } from '..'
import { useGlobal, store } from '../../store'
import { Role } from '../../enum/Enums';

interface Props { }

class SplashScreen extends React.Component<any, Props> {
  render() {
    const { bodySp, sectionContainer, sectionTitle, sectionDescription, paddingBottom,
      buttonContainerSp, buttonTitleSp } = globalStyles
    const { navigation } = this.props
    return (
      <View style={bodySp}>
        <View style={sectionContainer}>
          <Text style={sectionTitle}>Управляй своим домом</Text>
        </View>
        <Text style={sectionDescription}>
          Данное приложение предназначено для упрощения взаимодействия
          собственников квартир в многоэтажном доме с целью совместного управления домом.
              </Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View style={paddingBottom}>
            <Image source={require('../../../icon/bigHome.png')} style={globalStyles.image} />
          </View>
          <View style={paddingBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate('App')}>
              <View style={buttonContainerSp}>
                <Text style={buttonTitleSp}>Продолжить</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { userLogin, token } = store.state;

const RootStack = createStackNavigator(
  {
    Splash: SplashScreen,
    App: !token ? NotAuthNavigation : userLogin.fk_Role == Role.admin ? NavigationAdmin : NavigationUser,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);
