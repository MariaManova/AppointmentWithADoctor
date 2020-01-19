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
        id: 0, fullName: '',
        photo: {
            id: 0,
            url: 'https://docplus.kg/img/noavatar.png',
            createdAt: '',
            removed: false
        },
        enum_Role: 0, fk_Photo: 0, enum_Gender: 0, phone: '', email: ''

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


