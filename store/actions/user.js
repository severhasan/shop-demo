import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiurls = {
    // order: 'http://localhost:8080/user/order/',
    order: '/api/user/order/'
}

export const resetUser = () => {
    return {
        orders: [],
        cart: []
    }
}

export const getOrders = token => {
    return dispatch => {
        axios.get(apiurls.order, {
            headers: {
                token: token
            }
        })
        .then(res => {
            dispatch(storeOrders(res.data.orders));
        })
        .catch(err => {
            // console.log(err);
        })
    }
}

export const storeOrders = orders => {
    return {
        type: actionTypes.GET_ORDERS,
        orders: orders
    }
}

export const addToCart = item => {
    return {
        type: actionTypes.ADD_TO_CART,
        item: item
    }
}

export const removeFromCart = item => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        item: item
    }
}

export const resetCart = () => {
    return {
        type: actionTypes.RESET_CART
    }
}