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
                shoppingitems: action.response.data.shopping_items,
                nextPage: action.response.data.next_page,
                prevPage: action.response.data.previous_page
            }
        case actionTypes.GET_SHOPPINGITEMS_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.NEXT_PAGE_REQUEST_SHOPPINGITEMS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.NEXT_PAGE_SUCCESS_SHOPPINGITEMS:
            return {
                ...state,
                loading: false,
                shoppingitems: action.response.data.shopping_items,
                nextPage: action.response.data.next_page,
                prevPage: action.response.data.previous_page
            }
        case actionTypes.NEXT_PAGE_ERROR_SHOPPINGITEMS:
            return {
                ...state,
                loading: false
            }
            case actionTypes.PREV_PAGE_REQUEST_SHOPPINGITEMS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PREV_PAGE_SUCCESS_SHOPPINGITEMS:
            return {
                ...state,
                loading: false,
                shoppingitems: action.response.data.shopping_items,
                nextPage: action.response.data.next_page,
                prevPage: action.response.data.previous_page
            }
        case actionTypes.PREV_PAGE_ERROR_SHOPPINGITEMS:
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
        case actionTypes.CREATE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                isFormOpen: false
            }
        case actionTypes.CREATE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.CREATE_ITEM_ERROR:
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
        case actionTypes.EDIT_SHOPPINGITEM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.EDIT_SHOPPINGITEM_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.EDIT_SHOPPINGITEM_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_SHOPPINGITEM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_SHOPPINGITEM_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_SHOPPINGITEM_ERROR:
            return {
                ...state,
                loading: false
            }
        case actionTypes.GET_SINGLE_SHOPPINGLIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_SINGLE_SHOPPINGLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                singleShoppinglist: action.response.data
            }
        case actionTypes.GET_SINGLE_SHOPPINGLIST_ERROR:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}