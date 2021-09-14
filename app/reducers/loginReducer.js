import { SAVE_LOGIN, SAVE_USER, SAVE_TOKEN, SAVE_PERSISTENT_DATA, SAVE_STATUS_LOCATION, 
    SAVE_PERMISION_QUESTION_DONE,SAVE_CLOSING_SESSION } from '../actions/types'

const INIT_STATE = {
    Login: null,
    User: null,
    Token: null,
    persistentData: {},
    statusLocation: null,
    permissionQuestionDone: null,
    closingSession:false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case SAVE_LOGIN:
            return { ...state, Login: action.payload };
        case SAVE_USER:
            return { ...state, User: action.payload };
        case SAVE_TOKEN:
            return { ...state, Token: action.payload };
        case SAVE_PERSISTENT_DATA:
            return { ...state, persistentData: action.payload };
        case SAVE_STATUS_LOCATION:
            return { ...state, statusLocation: action.payload };
        case SAVE_PERMISION_QUESTION_DONE:
            return { ...state, permissionQuestionDone: action.payload };
            case SAVE_CLOSING_SESSION:
            return { ...state, closingSession: action.payload };
        default: return { ...state };
    }
}