import {createStackNavigator} from 'react-navigation-stack';
import {NotAuthNAVIGATION, NAVIGATIONAdmin, NAVIGATIONUser, PROFILE, AUTH, REGISTRATION, 
    ADDRESSScreen, HOMEProfile, TENTENScreen, GroupLIST,GroupPRO, AddHOME,SEARCHHomeScreen, AddGROUP, 
    AddADVERT} from './routes'
import {GroupScreen, GroupProfile, ProfileScreen, AuthScreen, RegistrationScreen, AddressScreen, AddHomeScreen, 
    AddGroupScreen, AddAdvertScreen, SearchHomeScreen, HomeProfile, TentantsScreen} from './components'
import NotAuthNavigation from './NotAuthNavigation'
import NavigationAdmin from './NavigationAdmin'
import NavigationUser from './NavigationUser'

export default createStackNavigator(
    {
        [NotAuthNAVIGATION]: NotAuthNavigation,
        [NAVIGATIONAdmin]: NavigationAdmin,
        [NAVIGATIONUser]: NavigationUser,
        [PROFILE]: ProfileScreen,
        [HOMEProfile]: HomeProfile,
        [TENTENScreen]: TentantsScreen,
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
