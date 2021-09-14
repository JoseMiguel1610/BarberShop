import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import ProductionReducer from './ProductionReducer'

export default combineReducers({
    loginReducer,
    ProductionReducer
})