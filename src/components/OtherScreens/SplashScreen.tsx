import React from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles, AuthScreen, RegistrationScreen, HomeProfile, AddressScreen, ProfileScreen, EditProfileScreen, TentantsScreen, GroupListScreen, GroupProfile, AddHomeScreen, AddGroupScreen, AddAdvertScreen, SearchHomeScreen, AdvertProfile, ExitScreen } from '..'
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../../Navigations/MainNavigation';
import { StackNavigatorParamlist } from '../../Navigations/types';
import { NavigationAdmin } from '../../Navigations/NavigationAdmin';
import NavigationUser from '../../Navigations/NavigationUser';
import  HOMEScreen  from '../HomeTab/HomeScreen';

interface Props { }

class SplashScreen extends React.Component<any, Props> {
  render() {
    const { bodySp, sectionContainer, sectionTitle, sectionDescription, paddingBottom,
      buttonContainerSp, buttonTitleSp, buttonContentSp, image } = globalStyles
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
            <Image source={require('../../../icon/bigHome.png')} style={image} />
            <Button
              mode="contained"
              uppercase={false}
              onPress={() => navigation.replace('MainNavigation')}
              contentStyle={buttonContentSp}
              style={buttonContainerSp}
              labelStyle={buttonTitleSp}>Продолжить </Button >
          </View>
        </View>
      </View>
    );
  }
}

const Stack = createStackNavigator<StackNavigatorParamlist>();

function RootStackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
        <Stack.Screen name="NAVIGATIONAdmin" component={NavigationAdmin} />
        <Stack.Screen name="NAVIGATIONUser" component={NavigationUser} />
        <Stack.Screen name="AUTH" component={AuthScreen} />
        <Stack.Screen name="REGISTRATION" component={RegistrationScreen} />
        <Stack.Screen name='HOMEScreen' component={HOMEScreen} />
        <Stack.Screen name='HOMEProfile' component={HomeProfile} />
        <Stack.Screen name='ADDRESSScreen' component={AddressScreen} />
        <Stack.Screen name='PROFILE' component={ProfileScreen} />
        <Stack.Screen name='EditPROFILE' component={EditProfileScreen} />
        <Stack.Screen name='TENTENScreen' component={TentantsScreen} />
        <Stack.Screen name='GroupLIST' component={GroupListScreen} />
        <Stack.Screen name='GroupPRO' component={GroupProfile} />
        <Stack.Screen name='AddHOME' component={AddHomeScreen} />
        <Stack.Screen name='AddGROUP' component={AddGroupScreen} />
        <Stack.Screen name='AddADVERT' component={AddAdvertScreen} />
        <Stack.Screen name='SEARCHHomeScreen' component={SearchHomeScreen} />
        <Stack.Screen name='ADVERTPro' component={AdvertProfile} />
        <Stack.Screen name='EXITScreen' component={ExitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default (RootStackScreen);
