import * as React from 'react';
import {NavigationAdmin} from './NavigationAdmin';
import { Provider as PaperProvider } from 'react-native-paper';
import {NavigationUser, NotAuthNavigation} from '../Navigations';
import {  store } from '../store'
import { Role } from '../enum/Enums';

const { userLogin, token } = store.state;

 function MainNavigation() {
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
export {MainNavigation}