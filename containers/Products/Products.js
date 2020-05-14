import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import ProductCard from '../../components/Products/ProductCard/ProductCard';
import Filters from '../../components/Products/Filters/Filters';
import classes from './Products.module.css';

const Products = props => {
    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [category, setCategory] = useState('');
    const [range, setRange] = useState(0);
    const [available, setAvailable] = useState(true);
    
    useEffect(() => {
        if (available) {
            axios.get('/api/products')
                .then(res => {
                    setProducts(res.data);
                    setProductList(res.data);
                    setAvailable(false);
                });
        }
        let filtered = products;
        if (category) {
            filtered = filtered.filter(item => item.category === category);
        } 
        if (range) {
            filtered = filtered.filter(item => item.sale_price <= range)
        }
        setProductList(filtered);

    }, [category, range]);

    const setFilterCategory = cat => {
        if (category === cat) {
            setCategory('');
        } else {
            setCategory(cat);
        }
    }

    const setPriceRange = limit => {
        if (range === limit) {
            setRange(0);
        } else {
            setRange(limit);
        }
    }

    const list = (
        <>
            {
                productList.map(product => (
                    <ProductCard key={'list_' + product._id} product={product} image_url={props.paths.image} />
                ))
            }
        </>
    )

    return (
        <div className='row p-0 m-0'>
            <div className='col-lg-2 col-md-12 justify-content-center d-flex'>
                <Filters category={category} range={range} setPriceRange={setPriceRange} setCategory={setFilterCategory} />
            </div>
            <div className={`${classes.Container} col-lg-9 col-sm-12`}>
                <div className='d-flex flex-wrap'>
                    {list}
                </div>
            </div>
        </div>

    )
}


const mapStateToProps = state => ({
    paths: state.user.paths
});


export default connect(mapStateToProps)(Products);