import * as initialState from './initialState';
import * as actionTypes from '../actions/actionConst';

export default function shoppingItemReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SHOPPINGITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_SHOPPINGITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                shoppingitems: action.response.data.shopping_items
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
        default:
            return state
    }
}