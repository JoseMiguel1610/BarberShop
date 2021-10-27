import AsyncStorage from '@react-native-async-storage/async-storage';

export const getJWT = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@token')
        return jsonValue
    } catch (e) {
        console.log(e)
        return false
    }
}

export const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
        return false
    }
}

export const storeTokenJWT = async (value) => {
    try {
        await AsyncStorage.setItem('@token', value)
    } catch (e) {
        console.log(e)
    }
}

export const storeUserData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
        console.log(e)
    }
}


export const themeDark = async (value) => {
    console.log(value);
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@theme', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getThemeDark = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@theme')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
        return false
    }
}