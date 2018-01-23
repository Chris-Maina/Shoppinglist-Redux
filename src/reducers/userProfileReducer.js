import * as actionTypes from '../actions/actionConst';
import * as initialState from './initialState';

export default function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.response.data
            }
        case actionTypes.GET_USER_PROFILE_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.TOGGLE_FORM_OPEN:
            return {
                ...state,
                isFormOpen: true
            }
        case actionTypes.TOGGLE_FORM_CLOSE:
            return {
                ...state,
                isFormOpen: false
            }
        case actionTypes.PUT_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PUT_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.response.data
            }
        case actionTypes.PUT_USER_PROFILE_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }

}