import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/user';

import classes from './Orders.module.css';


const Orders = props => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        setOrders(props.orders);
    }, [props.orders]);

    const empty = (
        <div>
            <h2>You do not seem to have ordered anything yet.</h2>
            <Link href={props.paths.products}><a><p>Continue shopping</p></a></Link>
        </div>
    );

    const list = (
        <>
            {
                orders.map((item, idx) => (
                    <div key={'order_' + idx + item._id}>
                        <h4>Order {idx + 1}</h4>
                        {
                            item.map((product, index) => (
                                <div key={'order_product' + index} className={classes.Product + ' row'}>
                                    <div className={`${classes.Container} col-3`}>
                                        <img src={props.paths.image + product.product_id + '.jpg'} alt={product.title} />
                                    </div>
                                    <div className='col-8'>
                                        <h6>{product.title}</h6>
                                        <p>	&#8378; {product.sale_price}</p>
                                        <ul>
                                            {
                                                product.description.map((li, idx) => (
                                                    <li key={'li_' + idx + product._id}>{li}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </>
    )

    return (
        <div className='container'>
            <div className={classes.Header}>
                <h2 className={classes.Title}>Orders</h2>
                <Link href={props.paths.products}><a><button className='btn btn-primary float-right'>Continue Shopping </button></a></Link>
            </div>
            {
                orders.length > 0
                    ?
                    <div>
                        {list}
                    </div>
                    : empty
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        paths: state.user.paths,
        api: state.auth.api,
        orders: state.user.orders
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         getOrders: () => dispatch(actions.getOrders())
//     }
// }

export default connect(mapStateToProps)(Orders);