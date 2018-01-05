import {combineReducers} from 'redux'
import loadingStatus from './registerReducer'


const rootReducer = combineReducers({
    loadingStatus
});

export default rootReducer;
