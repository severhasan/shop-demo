import React, { useState } from 'react';
// import Router from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import classes from '../Auth.module.css';

const Register = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    const checkUsername = () => {
        return username.length > 3;
    }

    const checkEmail = () => {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(String(email).toLowerCase());
    }

    const checkPassword1 = () => {
        return password1.length > 5;
    }

    const checkPassword2 = () => {
        return password1 === password2
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkUsername()) return setError('Please enter a valid username');
        if (!checkEmail()) return setError('Please enter a valid email');
        if (!checkPassword1()) return setError('Please enter a valid password');
        if (!checkPassword2()) return setError('Passwords do not match');
        console.log(error);

        props.onAuth(username, email, password1, password2);
    }

    return (
        <div className={classes.Container}>
            <h2 className={classes.Title}>Create an Account</h2>

            <h6 className={`${classes.Message} text-danger`}>{error}</h6>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username/Fullname</label>
                    <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={e => setPassword1(e.target.value)} type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Retype Password</label>
                    <input onChange={e => setPassword2(e.target.value)} type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="border-top pt-3">
                <small className="text-muted">
                    Already have an account? <span className='ml-2'>&#xb7;</span><Link href={props.paths.login}><a className="ml-2">Login</a></Link>
                </small>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        paths: state.auth.paths.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);