import React from 'react';
// import Link from 'next/link';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/user';

const ProductCard = props => {
    const { product } = props;
    const { image_url } = props;

    const handleCart = () => {
        props.addToCart(product);
    }

    const img_src = image_url + product.product_id + '.jpg';

    return (
        <div className='card-container col-lg-3 col-md-6 p-4'>
            <div className="card">
                <img src={img_src} className="card-img-top" alt={product.title} />
                <div className="card-body">
                    <strong><h2 className="card-title small">{product.title}</h2></strong>
                    {
                        product.sale_price === product.price ?
                        <p className="card-text text-right">&#8378;{product.price}</p>

                        : <div className='d-flex mb-4'>
                            <small><p className="card-text">&#8378;<s>{product.price}</s></p></small>
                            <p className="card-text ml-2">&#8378;{product.sale_price}</p>
                        </div>

                    }
                    <div className='d-flex justify-content-between'>
                        <small><button onClick={handleCart} className="btn btn-sm btn-primary p-1">Add to Cart</button></small>
                        <small><button className="btn btn-sm btn-primary p-1">See details</button></small>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        cart: state.user.cart,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        addToCart: item => dispatch(actions.addToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);