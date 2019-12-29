import {createStackNavigator} from 'react-navigation-stack';
import {NotAuthNAVIGATION,NAVIGATIONAdmin, NAVIGATIONUser, GroupLIST, 
    GroupPRO, AUTH, REGISTRATION, ADDRESSScreen, HOMEScreen, AddHOME,SEARCHHomeScreen, AddGROUP, 
    AddADVERT} from './routes'
import {GroupScreen, GroupProfile, AuthScreen, RegistrationScreen, AddressScreen, AddHomeScreen, 
    AddGroupScreen, AddAdvertScreen, SearchHomeScreen} from './components'
import NotAuthNavigation from './NotAuthNavigation'
import NavigationAdmin from './NavigationAdmin'
import NavigationUser from './NavigationUser'
import HomeScreen from './components/HomeTab/HomeScreen'

export default createStackNavigator(
    {
        [NotAuthNAVIGATION]: NotAuthNavigation,
        [NAVIGATIONAdmin]: NavigationAdmin,
        [NAVIGATIONUser]: NavigationUser,
        [HOMEScreen]: HomeScreen,
        [GroupLIST]: GroupScreen,
        [GroupPRO]: GroupProfile,
        [AUTH]: AuthScreen,
        [REGISTRATION]: RegistrationScreen,
        [ADDRESSScreen]: AddressScreen,
        [AddHOME]: AddHomeScreen,
        [AddGROUP]: AddGroupScreen,
        [AddADVERT]: AddAdvertScreen,
        [SEARCHHomeScreen]: SearchHomeScreen,
    },
    {
        headerMode: 'none'
    }
)
