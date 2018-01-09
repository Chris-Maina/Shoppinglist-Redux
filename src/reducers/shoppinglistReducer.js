import * as actionTypes from '../actions/actionConst';
import * as initialState from './initialState';

export default function shoppinglistReducer(state=initialState, action){
    switch(action.type){
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
        default:
            return state;
    }
}