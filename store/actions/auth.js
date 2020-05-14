import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as userActions from './user';
import Router from 'next/router';

import Cookies from 'js-cookie'


const apiurls = {
    // login: 'http://localhost:8080/api/auth/login/',
    // register: 'http://localhost:8080/api/auth/register/',
    // user_info: 'http://localhost:8080/apiuser/info/',

    login: '/api/auth/login/',
    register: '/api/auth/register/',
    user_info: '/api/user/info/',
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = data => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.token,
        email: data.email,
        username: data.username
    }
}

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    Cookies.remove('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(apiurls.login, {
            email: email,
            password: password
        })
        .then(res => {
            if (res.data.error) {
                return dispatch(authFail(res.data));
            }
            Cookies.set('token', res.data.token, { expires: 1 });
            dispatch(authSuccess(res.data));
            Router.push('/');
            // dispatch(userActions.getOrders(res.data.token));
            // getOrders(token);
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(apiurls.register, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            if (res.data.error) {
                return dispatch(authFail(res.data));
            }
            dispatch(registerSuccess());
            Router.push('/login');
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = Cookies.get('token');

        if (token === undefined) {
            dispatch(logout());
        } else {
            axios.get(apiurls.user_info, {headers: {token: token}})
                .then(res => {
                    const username = res.data.username;
                    const email = res.data.email;
                    // getOrders(token);
                    dispatch(authSuccess({token: token, email: email, username: username}));
                    dispatch(userActions.getOrders(token));
                })
        }
    }
}