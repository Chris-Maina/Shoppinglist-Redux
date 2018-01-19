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
    return { type: types.GET_SHOPPINGITEMS_ERROR, error }
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
                // dispatch an error action
                dispatch(getShoppingitemsError(error.response))
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

export function nextPageRequestItems(){
    return { type: types.NEXT_PAGE_REQUEST_SHOPPINGITEMS}
}
export function nextPageSuccessItems(response){
    return { type: types.NEXT_PAGE_SUCCESS_SHOPPINGITEMS, response}
}
export function nextPageErrorItems(){
    return { type: types.NEXT_PAGE_ERROR_SHOPPINGITEMS}
}

export function getNextPageItems(nextPageUrl){
    return function (dispatch){
        // dispatch next page request
        dispatch(nextPageRequestItems())
        return axiosConfig.request({
            method: 'get',
            url: nextPageUrl,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response=>{
            // dispatch a success action
            dispatch(nextPageSuccessItems(response))
        }).catch(error=>{
            // dispatch an error action
            dispatch(nextPageErrorItems())
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
}

export function prevPageRequestItems(){
    return { type: types.PREV_PAGE_REQUEST_SHOPPINGITEMS}
}
export function prevPageSuccessItems(response){
    return { type: types.PREV_PAGE_SUCCESS_SHOPPINGITEMS, response}
}
export function prevPageErrorItems(){
    return { type: types.PREV_PAGE_ERROR_SHOPPINGITEMS}
}

export function getPrevPageItems(prevPageUrl){
    return function (dispatch){
        // dispatch next page request
        dispatch(prevPageRequestItems())
        return axiosConfig.request({
            method: 'get',
            url: prevPageUrl,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response=>{
            // dispatch a success action
            dispatch(prevPageSuccessItems(response))
        }).catch(error=>{
            // dispatch an error action
            dispatch(prevPageErrorItems())
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
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
            toast.success("Shopping item " + response.data.name + " created")
            // dispatch a create success action
            dispatch(createShoppingItemSuccess(response))
            // get all shopping items
            dispatch(getShoppingitems(shoppinglistId))
        }).catch(error => {
            if (error.response) {
                // dispatch a create error
                dispatch(createShoppingItemeError(error.response))
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
}
export function editClickOn() {
    return { type: types.EDIT_CLICK_ON }
}
export function editClickOff() {
    return { type: types.EDIT_CLICK_OFF }
}
export function editShoppingItemRequest() {
    return { type: types.EDIT_SHOPPINGITEM_REQUEST }
}
export function editShoppingItemSuccess(response) {
    return { type: types.EDIT_SHOPPINGITEM_SUCCESS, response }
}
export function editShoppingItemError(error) {
    return { type: types.EDIT_SHOPPINGITEM_ERROR, error }
}
export function editShoppingItem(item, shoppinglistId) {
    return function (dispatch) {
        return axiosConfig.request({
            method: 'put',
            url: `shoppinglists/${shoppinglistId}/items/${item.id}`,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: { ...item }
        }).then(response => {
            // dispatch a success action
            dispatch(editShoppingItemSuccess(response))

            toast.success("Shopping item edited to " + response.data.name)
            // get all shopping items
            dispatch(getShoppingitems(shoppinglistId))
        }).catch(error => {
            if (error.response) {
                // dispatch an error action
                dispatch(editShoppingItemError(error.response));
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
}
export function deleteShoppingItemRequest() {
    return { type: types.DELETE_SHOPPINGITEM_REQUEST }
}
export function deleteShoppingItemSuccess(response) {
    return { type: types.DELETE_SHOPPINGITEM_SUCCESS, response }
}
export function deleteShoppingItemError(error) {
    return { type: types.DELETE_SHOPPINGITEM_ERROR, error }
}
export function deleteShoppingItem(item, shoppinglistId, callback) {
    return function (dispatch) {
        // dispatch a delete request
        dispatch(deleteShoppingItemRequest())
        return axiosConfig.request({
            method: 'delete',
            url: `shoppinglists/${shoppinglistId}/items/${item.id}`,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: { ...item }
        }).then(response => {
            // dispatch a success action
            dispatch(deleteShoppingItemSuccess(response));
            toast.success(response.data.message);
            //get shopping items
            dispatch(getShoppingitems(shoppinglistId))
        }).catch(error => {
            if (error.response) {
                // dispatch an error action
                dispatch(deleteShoppingItemError(error.response))
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
}

export function getSingleShoppinglistRequest() {
    return { type: types.GET_SINGLE_SHOPPINGLIST_REQUEST }
}
export function getSingleShoppinglistSuccess(response) {
    return { type: types.GET_SINGLE_SHOPPINGLIST_SUCCESS, response }
}
export function getSingleShoppinglistError() {
    return { type: types.GET_SINGLE_SHOPPINGLIST_ERROR }
}
export function getSingleShoppinglist(shoppinglistId) {
    return function (dispatch) {
        // dispatch a get request
        dispatch(getSingleShoppinglistRequest())
        return axiosConfig.request({
            method: 'get',
            url: `/shoppinglists/${shoppinglistId}`,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response => {
            // dispatch a get success
            dispatch(getSingleShoppinglistSuccess(response))
        }).catch(error => {
            // dispatch an error action
            dispatch(getSingleShoppinglistError())
            if (error.response) {
                toast.error(error.response.data.message);
            }

        })
    }
}