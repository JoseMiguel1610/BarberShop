import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SaveLogin, SaveUser } from '../../../actions/loginActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../loading';

export default function LogOut(props) {
    const dispatch = useDispatch();
    const User = useSelector(reducers => reducers.loginReducer).User;

    useEffect(() => {
        async function SignOut() {
            dispatch(SaveLogin(null))
            dispatch(SaveUser(null))
            const keysToDelete = ["@user"]
            await AsyncStorage.multiRemove(keysToDelete)
        }
        SignOut()
    }, [])

    return <Loading logout />
}



