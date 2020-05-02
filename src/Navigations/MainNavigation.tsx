import * as React from 'react';
import {NavigationAdmin} from './NavigationAdmin';
import { Provider as PaperProvider } from 'react-native-paper';
import NotAuthNavigation from './NotAuthNavigation';
import NavigationUser from '../Navigations/NavigationUser';
import {  store } from '../store'
import { Role } from '../enum/Enums';

const { userLogin, token } = store.state;

export default function MainNavigation() {
  return (
    <PaperProvider>
        {!token ? 
            <NotAuthNavigation /> : 
            userLogin.fk_Role == Role.admin ? 
                <NavigationAdmin /> : 
                userLogin.fk_Role == Role.moderator ? 
                    <NavigationAdmin /> : 
                    <NavigationUser />}
    </PaperProvider>
  );
}
