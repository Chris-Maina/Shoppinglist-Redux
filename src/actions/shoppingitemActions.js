import * as types from './actionConst'
import { toast } from 'react-toastify'
import axiosConfig from './../components/common/baseConfig'

export function getShoppingitemsRequest() {
    return { type: types.GET_SHOPPINGITEMS_REQUEST }
}
export function getShoppingitemsSuccess(response) {
    return { type: types.GET_SHOPPINGITEMS_SUCCESS, response }
}
export function getShoppingitemsError(error) {
    return { type: types.GET_SHOPPINGITEMS_SUCCESS, error }
}
export function getShoppingitems(id) {
    return function (dispatch) {
        dispatch(getShoppingitemsRequest())
        return axiosConfig.request({
            method: 'get',
            url: `shoppinglists/${id}/items`,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response => {
            // dispatch success action
            dispatch(getShoppingitemsSuccess(response))
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    toast.error(error.response.data.message);
                    return window.localStorage.removeItem('token');
                }
                // dispatch a get error
                dispatch(getShoppingitemsError(error))
            }
        })
    }
}
export function formOpen() {
    return { type: types.TOGGLE_FORM_OPEN }
}
export function formClose() {
    return { type: types.TOGGLE_FORM_CLOSE }
}
export function createShoppingItemRequest() {
    return { type: types.CREATE_ITEM_REQUEST }
}
export function createShoppingItemSuccess(response) {
    return { type: types.CREATE_ITEM_SUCCESS, response }
}
export function createShoppingItemeError(error) {
    return { type: types.CREATE_ITEM_ERROR, error }
}
export function createShoppingItem(item, shoppinglistId, callback) {
    return function (dispatch) {
        // dispatch a create request
        dispatch(createShoppingItemRequest())
        return axiosConfig.request({
            method: 'post',
            url: `/shoppinglists/${shoppinglistId}/items`,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: { ...item }
        }).then(response => {
            // dispatch a create success action
            dispatch(createShoppingItemSuccess(response))
            // get all shopping items
            callback()
        }).catch(error => {
            if (error.response) {
                // dispatch a create error
                dispatch(createShoppingItemeError(error))
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    toast.error(error.response.data.message);
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
}
export function editClickOn(){
    return { type: types.EDIT_CLICK_ON}
}
export function editClickOff(){
    return { type: types.EDIT_CLICK_OFF}
}