import { SAVE_LOGIN, SAVE_USER, SAVE_TOKEN } from '../actions/types'

const INIT_STATE = {
    Login: null,
    User: null,
    Token: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case SAVE_LOGIN:
            return { ...state, Login: action.payload };
        case SAVE_USER:
            return { ...state, User: action.payload };
        case SAVE_TOKEN:
            return { ...state, Token: action.payload };
        default: return { ...state };
    }
}