import React, { useState, useEffect } from 'react';
import classes from './Filters.module.css';

const Filters = props => {
    const [fixedToTop, setFixedToTop] = useState(false);

    useEffect(() => {
       if (!fixedToTop) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 85) {
                        if (!fixedToTop){
                            setFixedToTop(true);
                        }
                    }
                })
        } else {
            window.addEventListener('scroll', () => {
                if (window.scrollY < 85) {
                    if (fixedToTop){
                        setFixedToTop(false);
                    }
                }
            })
        }

    }, [fixedToTop])



    return (
    <div style={{top: fixedToTop ? '0px !important' : 'auto', position: fixedToTop ? 'fixed' : 'absolute'}} className={classes.Container}>
        <div className={classes.Section}>
            <h6>Categories</h6>
            <ul>
                <li onClick={() => props.setCategory('Phone')} className={props.category === 'Phone' ? classes.Active : ''}>Phones</li>
                <li onClick={() => props.setCategory('Monitor')} className={props.category === 'Monitor' ? classes.Active : ''}>Monitors</li>
                <li onClick={() => props.setCategory('Laptop')} className={props.category === 'Laptop' ? classes.Active : ''}>Laptops</li>
            </ul>
        </div>
        <div className={classes.Section}>
            <h6>Price</h6>
            <ul>
                <li onClick={() => props.setPriceRange(1000)} className={props.range === 1000 ? classes.Active : ''}>0 - 1000</li>
                <li onClick={() => props.setPriceRange(2000)} className={props.range === 2000 ? classes.Active : ''}> 1000 - 2000 </li>
                <li onClick={() => props.setPriceRange(4000)} className={props.range === 4000 ? classes.Active : ''}> 2000 - 4000 </li>
            </ul>
        </div>
    </div>)
}

export default Filters;