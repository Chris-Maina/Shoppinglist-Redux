import {combineReducers} from 'redux';
import loadingStatus from './registerReducer';
import login from './loginReducer';
import shoppinglist from './shoppinglistReducer';
import shoppingitem from './shoppingitemReducer';


const rootReducer = combineReducers({
    loadingStatus,
    login,
    shoppinglist,
    shoppingitem
});

export default rootReducer;
