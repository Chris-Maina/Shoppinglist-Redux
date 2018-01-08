import {combineReducers} from 'redux'
import loadingStatus from './registerReducer'
import login from './loginReducer'
import shoppinglist from './shoppinglistReducer'


const rootReducer = combineReducers({
    loadingStatus,
    login,
    shoppinglist
});

export default rootReducer;
