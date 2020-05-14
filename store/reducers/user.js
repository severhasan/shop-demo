import * as actionTypes from '../actions/actionTypes';
import * as utility from '../utility/utility';

const initialState = {
    cart: [],
    orders: [],
    paths: {
        products: '/products',
        orders: '/orders',
        account: '/account',
        checkout: '/checkout',
        login: '/login',
        register: '/register',
        image: '/images/'
    }
}

const storeOrders = (state, action) => {
    return utility.updateObject(state, {
        orders: action.orders,
    })
}

const addToCart = (state, action) => {
    return utility.updateObject(state, {cart: [...state.cart, action.item]});
}

const removeFromCart = (state, action) => {
    state.cart = state.cart.filter(item => item !== action.item);
    return state;
}

const resetCart = (state, action) => {
    state.cart = [];
    return state;
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS: return storeOrders(state, action);
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state, action);
        case actionTypes.RESET_CART: return resetCart(state, action);
        default:
            return state;
    }
}

export default reducer;