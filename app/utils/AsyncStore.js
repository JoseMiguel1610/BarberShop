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

export const getPersistentData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@persistentData')
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

export const storePersistentData = async (value) => {
    try {
        const data = await getPersistentData()
        let newData = {}
        if (data) {
            newData = { ...data, ...value }
        } else {
            newData = value
        }
        const jsonValue = JSON.stringify(newData)
        await AsyncStorage.setItem('@persistentData', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const deletePersistentDataKeyAS = async (key) => {
    try {
        let data = await getPersistentData()
        delete data[key]
        //console.log("deletePersistentDataKey in asyncstore:", data)
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('@persistentData', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const storeIsVisitor = async (bool) => {
    try {
        const jsonValue = JSON.stringify(bool)
        await AsyncStorage.setItem('@isVisitor', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getIsVisitor = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@isVisitor')
        return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
        console.log(e)
        return false
    }
}

//Estado del permiso de ubicación
export const storeStatusLocation = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@location', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getStatusLocation = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@location')
        return jsonValue
    } catch (e) {
        console.log(e)
        return false
    }
}

//@postLocation => si es true: el usuario ya paso por la vista de permisor de ubicación, si es false: el usuario inicia la app por 1era vez
export const storePermissionQuestionDone = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        //console.log("jsonValue postLocation:",jsonValue)
        await AsyncStorage.setItem('@postLocation', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getPermissionQuestionDone = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@postLocation')
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
        return false
    }
}

//Carrito
export const storeListRegisters = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@listRegisters', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getListRegisters = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@listRegisters')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
        return false
    }
}

export const storeListRiesgo = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@listRiesgo', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getListRiesgo = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@listRiesgo')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
        return false
    }
}

export const storeListFertilizantes = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@listFer', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getListFertilizantes = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@listFer')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
        return false
    }
}

export const storeListTipRiesgo = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@listTipRiesgo', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getListTipRiesgo = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@listTipRiesgo')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
        return false
    }
}

export const storeListTipFertilizantes = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@listTipFertilizantes', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getListTipFertilizantes = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@listTipFertilizantes')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
        return false
    }
}

//StoresByUser in Admin
export const saveStoresByUserAdmin = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@stores', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getStoresByUserAdmin = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@stores')
        return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (e) {
        console.log(e)
        return false
    }
}

//CategoriesFullProducts in Admin
export const saveCategoriesFullProducts = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@catFullProd', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getCategoriesFullProducts = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@catFullProd')
        return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (e) {
        console.log(e)
        return false
    }
}

//CategoriesWhitSubcategories in Admin
export const saveCatsWithSubcats = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@catsWhitSubcats', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getCatsWithSubcats = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@catsWhitSubcats')
        return jsonValue !== null ? JSON.parse(jsonValue) : {};
    } catch (e) {
        console.log(e)
        return []
    }
}

//Locations user
export const saveLocationUser = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@locationUser', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const getLocationUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@locationUser')
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}

// **************************chat Kdriver JOS *****************************

export const setChatKD_Data = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@chatKD', jsonValue)
    } catch (e) {
        console.log(e)
    }
}


export const getChatKD_Data = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@chatKD')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
        return []
    }
}

// **************************chat Kdriver JOS *****************************

export const setChatCLI_Data = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@chatCLI', jsonValue)
    } catch (e) {
        console.log(e)
    }
}


export const getChatCLI_Data = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@chatCLI')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
        return []
    }
}

// ************************** Notificaciones Push *****************************

export const setFireToken = async (value) => {
    try {
        // const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@firetoken',value)
    } catch (e) {
        console.log(e)
    }
}

export const getFireToken = async () => {
    try {
        const Value = await AsyncStorage.getItem('@firetoken')
        return Value != null ? Value : null;
    } catch (e) {
        console.log(e)
        return null
    }
}