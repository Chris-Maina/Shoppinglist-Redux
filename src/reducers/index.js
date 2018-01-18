import {combineReducers} from 'redux';
import loadingStatus from './registerReducer';
import login from './loginReducer';
import shoppinglist from './shoppinglistReducer';
import shoppingitem from './shoppingitemReducer';
import search from './searchReducer';


const rootReducer = combineReducers({
    loadingStatus,
    login,
    shoppinglist,
    shoppingitem,
    search
});

export default rootReducer;
