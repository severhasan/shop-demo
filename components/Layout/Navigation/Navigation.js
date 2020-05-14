import Link from 'next/link';
import UserButtons from './UserButtons/UserButtons';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
            <Link href="/">
                <a className="navbar-brand">Shoppy</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link href='/products'>
                            <a className="nav-link">Products <span className="sr-only">(current)</span></a>
                        </Link>
                    </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                // <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                // <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                // </form> */}
                <UserButtons />
            </div>
        </div>
    </nav>
);

export default Navbar;