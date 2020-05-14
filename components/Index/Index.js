import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import classes from './Index.module.css';

const Index = props => {

    return (
        <div className={classes.Container}>
            <div className={classes.Slogan}>
                <p className={classes.Fadein}>As easy as one click.</p>
                <Link href={props.paths.products}><a><p className={classes.Fadein2}>Start Shopping Now</p></a></Link>
            </div>
            <img src={props.paths.image + 'landing_img.jpg'} alt='landing image' />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        paths: state.user.paths
    }
  }


export default connect(mapStateToProps)(Index);