import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../containers/Layout';
import './main.css';
import App from 'next/app';
import * as actions from '../store/actions/auth';

// import { createStore, compose, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import store from '../store/store';
// import thunk from 'redux-thunk';
// import reducer from '../store/reducers/index';

import { fab } from '@fortawesome/free-brands-svg-icons';
import far from '../far';
import fas from '../fas';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add.apply(library, fas.concat(far));
library.add(fab);

// const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhances(
//   applyMiddleware(thunk)
// ));
// const composeEnhances = composeWithDevTools || compose;
// // const makeStore = () => createStore(reducer, applyMiddleware(thunk));
// const makeStore = () => createStore(reducer, composeEnhances(
//     applyMiddleware(thunk)
// ));

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be access by the client
        return {pageProps: pageProps};
    }

    render() {
        const {Component, pageProps, store} = this.props;

        return (
            <Provider store={store} >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        )
    }
}

// MyApp.getInitialProps = async ({ store }) => {
//     await store.dispatch(authCheckState());
// };

const makeStore = () => store;
  
export default withRedux(makeStore)(MyApp);