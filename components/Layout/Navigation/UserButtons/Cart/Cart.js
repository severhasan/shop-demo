import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import classes from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = props => {
    const collapsedMenu = {
        container: [classes.Container, classes.NotVisible],
        menu: [classes.Menu, classes.Collapsed],
        button: [classes.Link],
        arrow: [classes.UserArrow]
    }

    const [styles, setStyles] = useState(collapsedMenu);
    const [timer, setTimer] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartCount, setCartCount] = useState(props.cart.length);
    
    useEffect(() => {
        setCartProducts(props.cart);
        setCartCount(props.cart.length);
        
        if (props.cart.length !== cartCount && props.cart.length > 0) {
            expandCartMenu();
            
            setTimeout(() => {
                collapseCartMenu();
            }, 1200)
        }
    }, [props.cart])


    const expandCartMenu = () => {
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

    const collapseCartMenu = (initiator) => {
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
        <Link href='/checkout'>
            <div className={classes.User + ' mr-4'} onMouseLeave={() => collapseCartMenu(false)}>
                <button id='nav-user-button' onMouseOver={expandCartMenu} className={styles.button.join(' ')}>Cart <FontAwesomeIcon className={classes.Icon} icon="shopping-cart" /></button>

                <div className={styles.container.join(' ')} onMouseOver={clearTimer}>
                    <div className={styles.arrow.join(' ')}><span className={classes.ArrowUp}></span></div>
                    <div className={classes.MenuContainer} >
                        <div id='nav-user-menu' className={styles.menu.join(' ')}>
                            <div className={classes.MenuLink}>
                                <span onClick={() => collapseCartMenu(true)} className={classes.CloseUserButton}>X</span>
                                <div className={classes.Products}>
                                    {
                                        cartProducts.map((item, idx) => (
                                            <div key={'cart_img_' + idx + item._id}>
                                                <img src={props.paths.image + item.product_id + '.jpg'} />
                                                <small><p>{item.title}</p></small>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={classes.MenuTitle}>
                                    <Link href={props.paths.checkout}><a className='text-center'><p>Checkout</p></a></Link>
                                </div>
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
        cart: state.user.cart,
        paths: state.user.paths
    }
  }

export default connect(mapStateToProps)(Cart);