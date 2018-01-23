import {combineReducers} from 'redux';
import loadingStatus from './registerReducer';
import login from './loginReducer';
import shoppinglist from './shoppinglistReducer';
import shoppingitem from './shoppingitemReducer';
import search from './searchReducer';
import userprofile from './userProfileReducer';


const rootReducer = combineReducers({
    loadingStatus,
    login,
    shoppinglist,
    shoppingitem,
    search,
    userprofile
});

export default rootReducer;
