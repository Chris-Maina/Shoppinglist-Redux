import * as actionTypes from '../actions/actionConst';
import * as initialState from './initialState';

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SEARCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                searchResults: action.response.data
            }
        case actionTypes.SEARCH_ERROR:
            return {
                ...state,
                loading: false
            }
        default :
            return state
    }
}