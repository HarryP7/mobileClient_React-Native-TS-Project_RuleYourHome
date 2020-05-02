import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { BottomTabs } from './bottomTabs';
import { Details } from './details';
import { StackNavigatorParamlist } from './types';
import { appColor, w } from '../constants';
import { AuthScreen, RegistrationScreen, ProfileScreen, HomeProfile, TentantsScreen, 
  GroupListScreen, GroupProfile, AddressScreen, AddHomeScreen, AddGroupScreen, AddAdvertScreen, 
  SearchHomeScreen, AdvertProfile, ExitScreen, EditProfileScreen } from '../components';
import NotAuthNavigation from './NotAuthNavigation';
import { NavigationAdmin } from './NavigationAdmin';
import NavigationUser from './NavigationUser';

const Stack = createStackNavigator<StackNavigatorParamlist>();

export const StackNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode='none'
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header
              theme={{ colors: { primary: appColor },  }}
            >             
            <StatusBar backgroundColor={appColor} barStyle="light-content" /> 
              <Appbar.Content
                title={
                  title === 'Feed' ? (
                    <MaterialCommunityIcons
                      //style={{ marginRight: 10 }}
                      name="twitter"
                      size={40}
                      color={appColor}
                    />
                  ) : (
                    title
                  )
                }
                titleStyle={{
                  // alignSelf: 'center',
                  marginLeft: w * 0.08,
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                }}
              />
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={appColor}
                />
              ) : (
                <TouchableOpacity
                  // style={{ marginLeft: 10 }}
                  onPress={() => {
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                  }}
                >
                  {/* <Avatar.Image
                    size={40}
                    source={{
                      uri:
                        'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                    }}
                  /> */}
                </TouchableOpacity>
              )}
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen
        name="FeedList"
        component={BottomTabs}
        options={({ route }) => {
          console.log('options', { route });
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : 'Feed';
          return { headerTitle: routeName };
        }}
      />
      {/* <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerTitle: 'Tweet' }}
      />       */}
      <Stack.Screen name='AUTH' component={AuthScreen} />
      <Stack.Screen name='REGISTRATION' component={RegistrationScreen} />
      <Stack.Screen name='PROFILE' component={ProfileScreen} />
      <Stack.Screen name='EditPROFILE' component={EditProfileScreen} />
      <Stack.Screen name='HOMEProfile' component={HomeProfile} />
      <Stack.Screen name='TENTENScreen' component={TentantsScreen} />
      <Stack.Screen name='GroupLIST' component={GroupListScreen} />
      <Stack.Screen name='GroupPRO' component={GroupProfile} />
      <Stack.Screen name='ADDRESSScreen' component={AddressScreen} />
      <Stack.Screen name='AddHOME' component={AddHomeScreen} />
      <Stack.Screen name='AddGROUP' component={AddGroupScreen} />
      <Stack.Screen name='AddADVERT' component={AddAdvertScreen} />
      <Stack.Screen name='SEARCHHomeScreen' component={SearchHomeScreen} />
      <Stack.Screen name='ADVERTPro' component={AdvertProfile} />
      <Stack.Screen name='EXITScreen' component={ExitScreen} />
      <Stack.Screen name='NotAuthNAVIGATION' component={NotAuthNavigation} />
      <Stack.Screen name='NAVIGATIONAdmin' component={NavigationAdmin} />
      <Stack.Screen name='NAVIGATIONUser' component={NavigationUser} />
    </Stack.Navigator>
  );
};