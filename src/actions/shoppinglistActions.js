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
export function formOpen() {
    return { type: types.TOGGLE_FORM_OPEN }
}
export function formClose() {
    return { type: types.TOGGLE_FORM_CLOSE }
}
export function createshoppinglistRequest() {
    return { type: types.CREATE_SHOPPINGLIST_REQUEST }
}
export function editShoppinglistRequest() {
    return { type: types.EDIT_SHOPPINGLIST_REQUEST }
}
export function editShoppinglistSuccess(shoppinglist){
    return { type: types.EDIT_SHOPPINGLIST_SUCCESS, shoppinglist}
}

export function editShoppinglist(shoppinglist){
    return function (dispatch){
        
        return axiosConfig.request({
            method: 'put',
            url: '/shoppinglists/'+shoppinglist.id,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: {  }
        }).then().catch()
    }
}

export function createShoppinglist(shoppinglistname, callback) {
    return function (dispatch) {
        // dispatch a create request
        dispatch(createshoppinglistRequest());
        // post a shoppinglist
        return axiosConfig.request({
            method: 'post',
            url: '/shoppinglists/',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: { name: shoppinglistname }
        }).then(response => {
            toast.success("Shoppinglist " + response.data.name + " created");
            // get ALL shoppinglist
            callback();
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message)
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
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
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
                // dispatch a get error
                dispatch(getshoppinglistFail(error))
            }

        })
    }
}