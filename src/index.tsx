import { createStackNavigator } from '@react-navigation/stack';
import {NotAuthNAVIGATION, NAVIGATIONAdmin, NAVIGATIONUser, PROFILE, AUTH, REGISTRATION, 
    ADDRESSScreen, HOMEScreen, HOMEProfile, TENTENScreen, GroupLIST,GroupPRO, AddHOME,
    SEARCHHomeScreen, AddGROUP, AddADVERT, ADVERTPro, EXITScreen} from './Navigations/routes'
import {GroupListScreen, GroupProfile, ProfileScreen, AuthScreen, RegistrationScreen, 
    AddressScreen, AddHomeScreen, AddGroupScreen, AddAdvertScreen, SearchHomeScreen, 
    HomeProfile, TentantsScreen, AdvertProfile, ExitScreen} from './components'
import NotAuthNavigation from './Navigations/NotAuthNavigation'
import {NavigationAdmin} from './Navigations/NavigationAdmin'
import NavigationUser from './Navigations/NavigationUser'
import HomeScreen from './components/HomeTab/HomeScreen';
import { StackNavigatorParamlist } from './Navigations/types';

const Stack = createStackNavigator<StackNavigatorParamlist>();

export default function NavigatorStack() {
    return (
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name={NotAuthNAVIGATION} component={NotAuthNavigation} />
        <Stack.Screen name={NAVIGATIONAdmin} component={NavigationAdmin} />
        <Stack.Screen name={NAVIGATIONUser} component={NavigationUser} />
        <Stack.Screen name={AUTH} component={AuthScreen} />
        <Stack.Screen name={REGISTRATION} component={RegistrationScreen} />
        <Stack.Screen name={PROFILE} component={ProfileScreen} />
        <Stack.Screen name={HOMEProfile} component={HomeProfile} />
        <Stack.Screen name={HOMEScreen} component={HomeScreen} />
        <Stack.Screen name={TENTENScreen} component={TentantsScreen} />
        <Stack.Screen name={GroupLIST} component={GroupListScreen} />
        <Stack.Screen name={GroupPRO} component={GroupProfile} />
        <Stack.Screen name={ADDRESSScreen} component={AddressScreen} />
        <Stack.Screen name={AddHOME} component={AddHomeScreen} />
        <Stack.Screen name={AddGROUP} component={AddGroupScreen} />
        <Stack.Screen name={AddADVERT} component={AddAdvertScreen} />
        <Stack.Screen name={SEARCHHomeScreen} component={SearchHomeScreen} />
        <Stack.Screen name={ADVERTPro} component={AdvertProfile} />
        <Stack.Screen name={EXITScreen} component={ExitScreen} />
      </Stack.Navigator>
  );
}
