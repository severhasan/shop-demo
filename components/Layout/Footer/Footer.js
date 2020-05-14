import classes from './Footer.module.css';

const Footer = props => {

    return (
        <footer className={classes.Container}>
            <div className='container d-flex justify-content-between'>
                <div>
                    <span>
                        Security
                    </span>
                </div>
                <div>
                    <span>
                        Cookies
                    </span>
                </div>
                <div>
                    <span>
                        Payment Methods
                    </span>
                </div>
                <div>
                    <span>
                        Contact
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;