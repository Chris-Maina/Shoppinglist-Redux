import * as types from './actionConst'
import axiosConfig from '../components/common/baseConfig';
import { toast } from 'react-toastify';

export function getshoppinglistRequest() {
    return { type: types.GET_SHOPPINGLIST_REQUEST }

}
export function getshoppinglistSuccess(response) {
    return { type: types.GET_SHOPPINGLIST_SUCCESS, response }
}
export function getshoppinglistFail(error) {
    return { type: types.GET_SHOPPINGLIST_FAIL, error }
}

export function getShoppinglist() {
    return function (dispatch) {
        // dispatch a get request
        dispatch(getshoppinglistRequest());
        return axiosConfig.request({
            method: 'get',
            url: '/shoppinglists/',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response => {
            // dispatch a get success
            dispatch(getshoppinglistSuccess(response))
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(error.response.data.message);

            // dispatch a get error
            dispatch(getshoppinglistFail(error))
            }
            
        })
    }
}