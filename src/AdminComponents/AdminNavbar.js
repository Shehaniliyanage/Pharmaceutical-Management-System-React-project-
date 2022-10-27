import React,{useState} from 'react'
import './AdminNavbar.css';
import {Link} from 'react-router-dom';

function AdminNavbar() {

    const [click,setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className='navbar-logo-word'>
                <img src={process.env.PUBLIC_URL + "PharmacyLogo.png"} className='navbar-logo' alt='logo' />
                   &nbsp;JAYASIRI Pharmacy
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={click ? 'adminnav-menu active' : 'adminnav-menu'}>
                    <li className='nav-item'>
                        <Link to='/admincustomerorders' className='nav-links' onClick={closeMobileMenu}>
                            Customer Orders
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/adminsuppliers' className='nav-links' onClick={closeMobileMenu}>
                            Supplier
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/adminstocksview' className='nav-links' onClick={closeMobileMenu}>
                            View Stocks
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/adminaddstocks' className='nav-links' onClick={closeMobileMenu}>
                            Add Stocks
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/adminpayments' className='nav-links' onClick={closeMobileMenu}>
                            Payments
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/suppliersignup' className='nav-links' onClick={closeMobileMenu}>
                            Supplier Sign-up
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/adminsignup' className='nav-links' onClick={closeMobileMenu}>
                            Admin Sign-up
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
        </>
    )
}

export default AdminNavbar
