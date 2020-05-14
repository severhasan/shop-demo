import Cart from './Cart/Cart';
import Account from './Account/Account';

const UserButtons = props => {

    return (
        <ul className="navbar-nav">
            <Cart />
            <Account />
        </ul>
    )
}

export default UserButtons;