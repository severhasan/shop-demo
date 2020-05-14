import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/auth';

import classes from './Account.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Account = props => {
    const collapsedMenu = {
        container: [classes.Container, classes.NotVisible],
        menu: [classes.Menu, classes.Collapsed],
        button: [classes.Link],
        arrow: [classes.UserArrow]
    }

    const [styles, setStyles] = useState(collapsedMenu);
    const [timer, setTimer] = useState(0);

    const expandUserMenu = () => {
        clearTimer();

        if (!styles.menu.includes(classes.Collapsed)) return;
        const expandedMenu = {
            container: [classes.Container],
            menu: [classes.Menu],
            button: [classes.Link],
            arrow: [...styles.arrow, classes.Expanded]
        }
        setStyles(expandedMenu);
    }

    const collapseUserMenu = (initiator) => {
        if (initiator){
            return setStyles(collapsedMenu);
        }
        const timer = setTimeout(() => {
            setStyles(collapsedMenu);
        }, 400);
        setTimer(timer);
    }

    const clearTimer = () => {
        if (!timer) return;

        clearTimeout(timer);
        setTimer(0);
    }

    return (
        <Link href='/'>
            <div className={classes.User} onMouseLeave={() => collapseUserMenu(false)}>
                <button id='nav-user-button' onMouseOver={expandUserMenu} className={styles.button.join(' ')}>Account <FontAwesomeIcon className={classes.Icon} icon="user" /></button>

                <div className={styles.container.join(' ')} onMouseOver={clearTimer}>
                    <div className={styles.arrow.join(' ')}><span className={classes.ArrowUp}></span></div>
                    <div className={classes.MenuContainer} >
                        <div id='nav-user-menu' className={styles.menu.join(' ')}>
                            <div className={classes.MenuLink}>
                                <span onClick={() => collapseUserMenu(true)} className={classes.CloseUserButton}>X</span>
                                {
                                    props.isAuthenticated ?
                                    <>
                                        <div className={classes.MenuTitle}>
                                            <p className={classes.MenuWelcome}>Welcome, {props.username}</p> 
                                        </div>
                                        <Link href={props.userPath.orders}><a><p>Orders</p></a></Link>
                                        <Link href='/'><a onClick={props.logout}><p className={classes.BorderTop}>Logout</p></a></Link>

                                    </> :
                                    <>
                                        <div className={classes.MenuTitle}>
                                            <Link href={props.authPath.login}><a className={classes.UserTitleLink}>Login</a></Link>
                                            <Link href={props.authPath.register}><a className={classes.UserTitleLink}>Register</a></Link>
                                        </div>
                                        <Link href={props.userPath.orders}><a><p>Orders</p></a></Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        username: state.auth.username,
        authPath: state.auth.paths.auth,
        userPath: state.user.paths
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);