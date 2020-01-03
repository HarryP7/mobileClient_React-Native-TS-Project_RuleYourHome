import React from "react";
import useGlobalHook, { IStore } from "use-global-hook-ts";
import { User } from '../interfaces'

interface IAppState {
    token: string,
    userLogin: User,
}

const initialState: IAppState = {
    token: '',
    userLogin: {
        uid: '',
        fullName: '',
        avatar: {
            uid: '',
            url: 'https://docplus.kg/img/noavatar.png',
            createdAt: '',
            removed: false
        },
        fk_Role: 0,
        fk_Home: '',
        fk_Avatar: '',
        fk_Gender: 0,
        login: '',
        appartament: '',
        myGroups: [],
        address: '',
        phone: '',
        isApprovedHome: false
        
    }
}

export const { useGlobal, store } = useGlobalHook(React, initialState,
    {
        debug: true,
    });

export const actions = {
    Login: (token: string, user: User) => {
        const newState = { token, userLogin: user }
        store.setState(newState)
    }
}


