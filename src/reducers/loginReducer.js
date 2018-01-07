import * as initialState from "./initialState";
import * as actionTypes from '../actions/actionConst';


export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                redirect: false
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: true
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                redirect: false
            }
        default:
            return state
    }
}