import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SaveLogin, SaveUser } from '../../../actions/loginActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../loading';
import BackgroundService from 'react-native-background-actions';

export default function LogOut(props) {
    const dispatch = useDispatch();
    const User = useSelector(reducers => reducers.loginReducer).User;

    useEffect(() => {
        async function SignOut() {
            const keysToDelete = ["@token", "@user"]
            console.log("keysToDelete:", keysToDelete)
            await AsyncStorage.multiRemove(keysToDelete)
            dispatch(SaveLogin(false))
        }
        SignOut()
        return async () => {
            dispatch(SaveUser(null))
            BackgroundService.stop()
        }
    }, [])

    return <Loading logout />
}



