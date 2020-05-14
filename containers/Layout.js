import React, { useEffect } from 'react';
import Head from 'next/head'
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';
// import * as userActions from '../store/actions/user';

import Navbar from '../components/Layout/Navigation/Navigation';
import Footer from '../components/Layout/Footer/Footer';
import classes from './Layout.module.css'

const Layout = props => {
    useEffect(() => {
        props.onTryAutoSignUp();
    }, [props.token])

    return (
        <div>
            <Head>
                <title>Shoppy</title>

                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
            </Head>
            <Navbar />
            <div>
                <main className={classes.Container}>
                    {props.children}
                </main>
            </div>
            <Footer />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(authActions.authCheckState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);