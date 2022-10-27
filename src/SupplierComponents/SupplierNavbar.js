import React,{useState} from 'react'
import './SupplierNavbar.css'
import {Link} from 'react-router-dom';

function SupplierNavbar() {

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
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/suppliermyorders' className='nav-links' onClick={closeMobileMenu}>
                            Order List
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    </>
  )
}

export default SupplierNavbar
