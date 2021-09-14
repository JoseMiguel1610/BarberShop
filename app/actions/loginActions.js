import { SAVE_LOGIN, SAVE_PERSISTENT_DATA, SAVE_PERMISION_QUESTION_DONE, SAVE_STATUS_LOCATION, SAVE_TOKEN, SAVE_USER, SAVE_CLOSING_SESSION } from './types'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const SaveLogin = (login) => async (dispatch/* ,getState */) => {
    dispatch({
        type: SAVE_LOGIN,
        payload: login
    })
}

export const SaveUser = (user) => async (dispatch/* ,getState */) => {
    dispatch({
        type: SAVE_USER,
        payload: user
    })
}

export const SaveToken = (token) => async (dispatch/* ,getState */) => {

    dispatch({
        type: SAVE_TOKEN,
        payload: token
    })
}

export const SavePersistentData = (data) => async (dispatch, getState) => {
    //console.log("data input of SavePersistentData Redux:", data)
    let { persistentData } = getState().loginReducer;
    persistentData = { ...persistentData, ...data }
    console.log("persistentData on redux:", persistentData)
    dispatch({
        type: SAVE_PERSISTENT_DATA,
        payload: persistentData
    })
}

export const deletePersistentDataKeyRedux = (key) => async (dispatch, getState) => {
    let { persistentData } = getState().loginReducer;
    delete persistentData[key]
    //console.log("deletePersistentDataKey in redux:", persistentData)
    dispatch({
        type: SAVE_PERSISTENT_DATA,
        payload: persistentData
    })
}

export const SaveClosingSession = (bolean) => async (dispatch/* ,getState */) => {
    dispatch({
        type: SAVE_CLOSING_SESSION,
        payload: bolean
    })
}
