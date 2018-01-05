import * as types from './actionConst';
import axiosConfig from '../components/common/baseConfig';
import { toast } from 'react-toastify';

export function registerRequest(){
    return { type: types.REGISTER_REQUEST}
}

export function registerSuccess(response) {
    return { type: types.REGISTER_SUCCESS, response }
}

export function registerError(error) {
    return { type: types.REGISTER_ERROR, error }
}
// Sends user details to Api
export function registerUser(user) {
    return function (dispatch) {
        // dispatch register user request
        dispatch(registerRequest());

        return axiosConfig.request({
            method: "post",
            url: '/auth/register/',
            data: { ...user }
        }).then(response => {
            toast.success(response.data.message);
            dispatch(registerSuccess(response));
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                dispatch(registerError(error));
            }
        })
    }
}