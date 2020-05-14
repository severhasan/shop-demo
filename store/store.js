import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const composeEnhances = composeWithDevTools || compose;

const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));

export default store;