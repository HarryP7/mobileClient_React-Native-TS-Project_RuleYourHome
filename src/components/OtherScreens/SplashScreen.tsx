import React from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  globalStyles, AuthScreen, RegistrationScreen, HomeProfile, HomeScreen,
  AddressScreen, ProfileScreen, EditProfileScreen, TentantsScreen,
  GroupListScreen, GroupProfile, AddHomeScreen, AddGroupScreen,
  AddAdvertScreen, SearchHomeScreen, AdvertProfile, ExitScreen, ChannelListScreen, ChannelScreen, ChatScreen, FindAccountScreen, EditPassScreen
} from '..'
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigation, NavigationAdmin, NavigationUser, NotAuthNavigation } from '../../Navigations';
import { StackNavigatorParamlist } from '../../Navigations/types';

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
            <Image source={{ uri: 'https://i.ibb.co/CnM58Qb/bigHome.png' }} style={image} />
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
        <Stack.Screen name="NOTAuthNavigation" component={NotAuthNavigation} />
        <Stack.Screen name="AUTH" component={AuthScreen} />
        <Stack.Screen name="REGISTRATION" component={RegistrationScreen} />
        <Stack.Screen name="FindAccountScreen" component={FindAccountScreen} />
        <Stack.Screen name="EditPassScreen" component={EditPassScreen} />
        <Stack.Screen name='HOMEScreen' component={HomeScreen} />
        <Stack.Screen name='HOMEProfile' component={HomeProfile} />
        <Stack.Screen name='ADDRESSScreen' component={AddressScreen} />
        <Stack.Screen name='PROFILE' component={ProfileScreen} />
        <Stack.Screen name='EditPROFILE' component={EditProfileScreen} />
        <Stack.Screen name='TENTENScreen' component={TentantsScreen} />
        <Stack.Screen name='GroupLIST' component={GroupListScreen} />
        <Stack.Screen name='GroupPRO' component={GroupProfile} />
        <Stack.Screen name='CHannelScreen' component={ChannelScreen} />
        <Stack.Screen name='CHannelListScreen' component={ChannelListScreen} />
        <Stack.Screen name='ChatScreen' component={ChatScreen} />
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
