import * as actionTypes from '../actions/actionConst';
import * as initialState from './initialState'

export default function registerUser(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REGISTER_REQUEST:
            return {...state,
                loading: true,
                redirect: false  
            };
        case actionTypes.REGISTER_SUCCESS:
            return {...state,
                loading: false,
                redirect: true     
            };
        case actionTypes.REGISTER_ERROR:
            return {...state,
                loading: false,
                redirect: false    
            };
        default:
            return state
    }
}
