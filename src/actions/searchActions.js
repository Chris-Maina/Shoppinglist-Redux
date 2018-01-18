import * as types from './actionConst';
import axiosConfig from './../components/common/baseConfig'
import { toast } from 'react-toastify';

export function searchRequest(){
    return { type: types.SEARCH_REQUEST}
}
export function searchSuccess(response){
    return { type: types.SEARCH_SUCCESS, response}
}
export function searchError(){
    return { type: types.SEARCH_ERROR}
}
export function searchShoppinglistOrItem(searchUrl, searchTerm){
    return function (dispatch){
        // dispatch search request action
        dispatch(searchRequest())
        return axiosConfig.request({
            method: 'get',
            url: `${searchUrl}?q=${searchTerm}`,
            headers: {
                'Authorization': 'Bearer '+ window.localStorage.getItem('token')
            }
        }).then(response => {
            // dispatch a search success
            dispatch(searchSuccess(response));
        }).catch( error => {
            if(error.response){
                // dispatch an search error action
                dispatch(searchError())
                toast.error(error.response.data.message)
                if (error.response.status === 408) {
                    return window.localStorage.removeItem('token');
                }
            }
        })
    }
}