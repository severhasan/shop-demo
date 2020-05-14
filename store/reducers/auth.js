import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    username: null,
    email: null,
    token: null,
    error: null,
    loading: false,
    message: null,
    api: {
        // product_view: 'http://localhost:8080/products/one/',
        // base: 'http://localhost:8080',
        // products: 'http://localhost:8080/products/',
        // images: 'http://localhost:8080/build/images/',
        // add_order: 'http://localhost:8080/user/order/',

        base: '/',
        products: '/api/products/',
        images: '/images/',
        add_order: '/api/user/order/',
    },
    paths: {
        auth: {
            base: '/',
            login: '/login',
            logout: '/logout',
            register: '/register'
        },
        main: {
            base: '/',
            products: '/products',
        },
        user: {
            orders: '/orders',
            account: '/account'
        }
    }
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        username: action.username,
        email: action.email,
        error: null,
        loading: false,
    });
}

const registerSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        message: 'Registration is successful. You can now log in to your account.'
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        email: null
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;