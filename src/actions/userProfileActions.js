import axiosConfig from '../components/common/baseConfig';
import { toast } from 'react-toastify';
import * as types from './actionConst';
import requireLogin from '../components/common/RequireLogin';
import UserProfile from '../components/userprofile/UserProfile';
import { Route } from 'react-router-dom';
import React from 'react';

export function getUserProfileRequest(){
    return { type: types.GET_USER_PROFILE_REQUEST}
}
export function getUserProfileSuccess(response){
    return { type: types.GET_USER_PROFILE_SUCCESS, response}
}
export function getUserProfileError(error){
    return { type: types.GET_USER_PROFILE_ERROR, error}
}
export function formOpen() {
    return { type: types.TOGGLE_FORM_OPEN }
}
export function formClose() {
    return { type: types.TOGGLE_FORM_CLOSE }
}
export function getUserProfile(){
    return function (dispatch){
        dispatch(getUserProfileRequest())
        return axiosConfig.request({
            method: 'get',
            url: '/user',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }).then(response => {
            // dispatch a success action
            dispatch(getUserProfileSuccess(response))
        }).catch(error => {
            dispatch(getUserProfileError(error))
            if(error.response){
                toast.error(error.response.data.message)
                if(error.response.status === 408){
                    window.localStorage.removeItem('token');
                    return <Route exact={true} path="/profile/" component={requireLogin(UserProfile)} />
                }
            }
        })
    }
}
export function putUserProfileRequest(){
    return { type: types.PUT_USER_PROFILE_REQUEST}
}
export function putUserProfileSuccess(response){
    return { type: types.PUT_USER_PROFILE_SUCCESS, response}
}
export function putUserProfileError(error){
    return { type: types.PUT_USER_PROFILE_ERROR, error}
}
export function updateUserProfile(user){
    return function (dispatch){
        // Dispatch put request
        dispatch(putUserProfileRequest())
        return axiosConfig.request({
            method: "put",
            url: "/user",
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            },
            data: user
        }).then(response => {
            toast.success(response.data.message);
            // dispatch put success
            dispatch(putUserProfileSuccess(response))
        }).catch(error => {
            // dispatch a put error
            dispatch(getUserProfileError())
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(error.response.data.message);
                if (error.response.status === 408) {
                    window.localStorage.removeItem('token');
                    return <Route exact={true} path={`/user`} component={requireLogin(UserProfile)} />
                }
            }
        })
    }
}
