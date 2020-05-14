import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { connect } from 'react-redux';
import Router from 'next/router';
import * as actions from '../../store/actions/user';

import classes from './Checkout.module.css';


const Checkout = props => {
    const total = props.cart.reduce((accumulator, curVal) => accumulator + Number(curVal.sale_price), 0).toFixed(2);
    
    const handleOrder = () => {
        const config = {
            headers: {
                token: props.token
            }
        }

        const data = {
            order: props.cart.map(item => item._id)
        }
        console.log(data);
        axios.post(props.api.add_order, data, config)
            .then(res => {
                if (!res.data.error) {
                    props.resetCart();
                    props.getOrders(props.token);

                    setTimeout(() => {
                        Router.push(props.paths.orders);
                    }, 200);
                    
                }
            })
    }

    const emptyCart = (
        <div>
            <h2>Your cart seems empty.</h2>
            <Link href={props.paths.products}><a><p>Continue shopping</p></a></Link>
        </div>
    );

    const list = (
        <>
        {
            props.cart.map((item, idx) => (
                <div key={'checkout_' + idx + item._id} className={classes.Product + ' row'}>
                    <div className={`${classes.Container} col-3`}>
                        <img src={props.paths.image + item.product_id + '.jpg'} alt={item.title} />
                    </div>
                    <div className='col-8'>
                        <h6>{item.title}</h6>
                        <p>	&#8378; {item.sale_price}</p>
                        <ul>
                            {
                                item.description.map((li, idx) => (
                                    <li key={'li_' + idx + item._id}>{li}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            ))
        }
        </>
    )

    return (
        <div className='container'>
            {
                !props.isAuthenticated && props.cart.length > 0 ?
                <div className='mb-4 alert-warning p-4'>
                    <h2>You need to login to complete checkout!</h2>
                    <p className='p-0'><Link href={props.paths.login}><a>Login</a></Link> or <Link href={props.paths.register}><a>Register</a></Link></p>
                </div>
                : null
            }
            <div className={classes.Header}>
                <h2 className={classes.Title}>Cart</h2>
                <span className='float-right mt-3'>Total: {total}</span>
            </div>
            {
                props.cart.length > 0
                ?
                <div>
                    {list}
                    <div className={classes.Checkout}>
                        <h3>Total: {total}</h3>
                        <button style={{cursor: props.isAuthenticated ? 'pointer' : 'no-drop'}} disabled={!props.isAuthenticated} onClick={handleOrder} className='btn btn-lg btn-primary'>Checkout</button>
                    </div>
                </div>
                : emptyCart
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token,
        token: state.auth.token,
        cart: state.user.cart,
        paths: state.user.paths,
        api: state.auth.api
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetCart: () => dispatch(actions.resetCart()),
        getOrders: token => dispatch(actions.getOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);