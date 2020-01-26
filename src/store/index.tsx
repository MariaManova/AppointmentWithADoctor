import React from "react";
import useGlobalHook, { IStore } from "use-global-hook-ts";
import { User, Patient, initialUser } from '../interfaces'

interface IAppState {
    token: string,
    patient: Patient,
    userLogin: User,
}

const initialState: IAppState = {
    token: '',
    patient: {        
        id: 0,
        address: '',
        Fk_User: 0,
        myAppointments: [],
        user: initialUser
    },
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
    Login: (token: string, patient: Patient, userLogin: User) => {
        const newState = { token, patient, userLogin }
        store.setState(newState)
    }
}


