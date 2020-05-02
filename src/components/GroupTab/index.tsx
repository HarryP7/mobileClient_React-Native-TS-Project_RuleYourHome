import { createStackNavigator } from '@react-navigation/stack';
import {GroupPRO, AddADVERT} from '../../Navigations/routes'
import { GroupProfile, AddAdvertScreen} from '..'

const GroupStack = createStackNavigator();

export default function RootNavigatorStack() {
    return (
      <GroupStack.Navigator headerMode='none'>
        <GroupStack.Screen name={GroupPRO} component={GroupProfile} />
        <GroupStack.Screen name={AddADVERT} component={AddAdvertScreen} />
      </GroupStack.Navigator>
  );
}