import { SAVE_LOGIN, SAVE_TOKEN, SAVE_USER } from './types'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Axios from "axios";
import { Config } from '../configuration/config';
import { actionByError } from '../utils/actionServerResponse';
import { storeUserData } from '../utils/AsyncStore';
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

export const GetDataLogin = (navigation) => async (dispatch, getState) => {
	let { User, Token } = getState().loginReducer;
	const urldata = Config.URL_SERVER + "/Usuarios/" + User.dni;
	try {
		const res = await Axios.get(urldata, {
			headers: { authorization: `Bearer ${Token}` },
		});
		console.log("DataUserActions:", res.data.objModel[0]);
        await storeUserData(res.data.objModel[0])
		dispatch({
			type: SAVE_USER,
			payload: res.data.objModel[0],
		});
	} catch (error) {
		actionByError(error, navigation);
	}
};