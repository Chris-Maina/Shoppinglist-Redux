import {combineReducers} from 'redux'
import loadingStatus from './registerReducer'
import login from './loginReducer'


const rootReducer = combineReducers({
    loadingStatus,
    login
});

export default rootReducer;
