import axiosConfig from '../components/common/baseConfig';
import { toast } from 'react-toastify';
import * as types from './actionConst';

export function loginRequest() {
    return { type: types.LOGIN_REQUEST };
}

export function loginSuccess(response) {
    return { type: types.LOGIN_SUCCESS, response };
}

export function loginFail(error) {
    return { type: types.LOGIN_FAIL, error };
}

export function loginUser(user) {
    return function (dispatch) {
        // dispatch login request
        dispatch(loginRequest());

        return axiosConfig.request({
            method: 'post',
            url: '/auth/login/',
            data: { ...user }
        }).then(response => {
            toast.success(response.data.message);
            // dispatch a success action
            dispatch(loginSuccess(response));

            // Load access token in local storage
            window.localStorage.setItem('token', response.data.access_token);

        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                
                // dispatch a fail action
                dispatch(loginFail(error));
            }
        })
    }
}