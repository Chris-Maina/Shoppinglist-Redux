import * as actionTypes from '../actions/actionConst';
import * as initialState from './initialState';

export default function shoppinglistReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SHOPPINGLIST_REQUEST:
            return {
                ...state,
                loading: true,
                redirect: false
            }
        case actionTypes.GET_SHOPPINGLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                redirect: false,
                shoppinglists: action.response.data.shopping_lists
            }
        case actionTypes.GET_SHOPPINGLIST_FAIL:
            return {
                ...state,
                loading: false,
                redirect: false
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
        case actionTypes.CREATE_SHOPPINGLIST_REQUEST:
            return {
                ...state,
                isFormOpen: false
            }
        case actionTypes.EDIT_SHOPPINGLIST_REQUEST:
            return {
                ...state,
                loading: true,
                isFormOpen: false
            }
        case actionTypes.EDIT_SHOPPINGLIST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.EDIT_SHOPPINGLIST_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_SHOPPINGLIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_SHOPPINGLIST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_SHOPPINGLIST_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.EDIT_CLICK_ON:
            return {
                ...state,
                isEditClicked: true
            }
        case actionTypes.EDIT_CLICK_OFF:
            return {
                ...state,
                isEditClicked: false
            }
        default:
            return state;
    }
}