import {createStackNavigator} from 'react-navigation-stack';
import {GroupPRO, AddADVERT} from '../../routes'
import { GroupProfile, AddAdvertScreen} from '..'



export default createStackNavigator(
    {
        [GroupPRO]: GroupProfile,
        [AddADVERT]: AddAdvertScreen
    },
    {
        //initialRouteName: GroupLIST,
        headerMode: 'none'
    }
)
