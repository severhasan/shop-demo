import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import classes from '../Auth.module.css';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let errorMesssage = '';
    if (props.error) {
        errorMesssage = props.error.message;
    }

    
    const checkUsername = () => {
        return email.length >= 3
    }

    const checkPassword = () => {
        return password.length >= 5
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkUsername() || !checkPassword()) return setError('Plase enter valid values');

        props.onAuth(email, password);
    }

    return (
        <div className={classes.Container}>
            <h2 className={classes.Title}>Login to Your Account</h2>

            {/* <h6 className={`${classes.Message} text-success`}>{props.message}</h6> */}

            {
                error ?
                <h6 className={`${classes.Message} text-danger`}>{error}</h6>
                :
                <h6 className={`${classes.Message} text-danger`}>{errorMesssage}</h6>
            }

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="border-top pt-3">
                <small className="text-muted">
                    You don't have an account? <span className='ml-2'>&#xb7;</span><Link href={props.paths.register}><a className="ml-2">Register</a></Link>
                </small>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        message: state.auth.message,
        error: state.auth.error,
        paths: state.auth.paths.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);