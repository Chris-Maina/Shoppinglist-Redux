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
            // dispatch a get error
            dispatch(getshoppinglistFail(error))
            if (error.response) {
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
export function nextPageRequest(){
    return { type: types.NEXT_PAGE_REQUEST_SHOPPINGLIST}
}
export function nextPageSuccess(response){
    return { type: types.NEXT_PAGE_SUCCESS_SHOPPINGLIST, response}
}
export function nextPageError(){
    return { type: types.NEXT_PAGE_ERROR_SHOPPINGLIST}
}
export function getNextPage(nextPageUrl){
    return function (dispatch){
        // dispatch next page request
        dispatch(nextPageRequest())
        return axiosConfig.request({
            method: 'get',
            url: nextPageUrl,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response=>{
            // dispatch a success action
            dispatch(nextPageSuccess(response))
        }).catch(error=>{
            // dispatch an error action
            dispatch(nextPageError())
            if (error.response) {
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

export function prevPageRequest(){
    return { type: types.PREV_PAGE_REQUEST_SHOPPINGLIST}
}
export function prevPageSuccess(response){
    return { type: types.PREV_PAGE_SUCCESS_SHOPPINGLIST, response}
}
export function prevPageError(){
    return { type: types.PREV_PAGE_ERROR_SHOPPINGLIST}
}
export function getPrevPage(prevPageUrl){
    return function (dispatch){
        // dispatch PREV page request
        dispatch(prevPageRequest())
        return axiosConfig.request({
            method: 'get',
            url: prevPageUrl,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response=>{
            // dispatch a success action
            dispatch(prevPageSuccess(response))
        }).catch(error=>{
            // dispatch an error action
            dispatch(prevPageError())
            if (error.response) {
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

export function editClickOn() {
    return { type: types.EDIT_CLICK_ON }
}
export function editClickOff() {
    return { type: types.EDIT_CLICK_OFF }
}

export function editShoppinglistRequest() {
    return { type: types.EDIT_SHOPPINGLIST_REQUEST }
}
export function editShoppinglistSuccess() {
    return { type: types.EDIT_SHOPPINGLIST_SUCCESS }
}
export function editShoppinglistError() {
    return { type: types.EDIT_SHOPPINGLIST_ERROR }
}


export function editShoppinglist(shoppinglist, callback) {
    return function (dispatch) {
        // dispath edit request action
        dispatch(editShoppinglistRequest());
        return axiosConfig.request({
            method: 'put',
            url: '/shoppinglists/' + shoppinglist.id,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: { ...shoppinglist }
        }).then(response => {
            toast.success("Shoppinglist edited to " + response.data.name);
            // dispatch success action
            dispatch(editShoppinglistSuccess());
            // get ALL shoppinglist
            dispatch(getShoppinglist())
        }).catch(error => {
            // dispath edit error action
            dispatch(editShoppinglistError())
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                // dispatch success action
                dispatch(editShoppinglistError());
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
}


export function deleteShoppinglistRequest() {
    return { type: types.DELETE_SHOPPINGLIST_REQUEST }
}
export function deleteShoppinglistSuccess() {
    return { type: types.DELETE_SHOPPINGLIST_SUCCESS }
}
export function deleteShoppinglistError() {
    return { type: types.DELETE_SHOPPINGLIST_ERROR }
}
export function deleteShoppinglist(shoppinglist, callback) {
    return function (dispatch) {
        // dispatch a delete request
        dispatch(deleteShoppinglistRequest());
        return axiosConfig.request({
            method: 'delete',
            url: '/shoppinglists/' + shoppinglist.id,
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: { ...shoppinglist }
        }).then(response => {
            toast.success("Shoppinglist " + shoppinglist.name + " deleted.");
            // dispatch delete success
            dispatch(deleteShoppinglistSuccess());
            // get ALL shoppinglist
            dispatch(getShoppinglist());
        }).catch(error => {
             // dispatch error action
             dispatch(deleteShoppinglistError());
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
export function createshoppinglistRequest() {
    return { type: types.CREATE_SHOPPINGLIST_REQUEST }
}
export function createshoppinglistSuccess() {
    return { type: types.CREATE_SHOPPINGLIST_SUCCESS }
}
export function createshoppinglistError() {
    return { type: types.CREATE_SHOPPINGLIST_ERROR }
}

export function createShoppinglist(shoppinglistname) {
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
            // dispatch create success action
            dispatch(createshoppinglistSuccess())
            toast.success("Shoppinglist " + response.data.name + " created");
            // get ALL shoppinglist
            dispatch(getShoppinglist());
        }).catch(error => {
            // dispatch create error action
            dispatch(createshoppinglistError())
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
