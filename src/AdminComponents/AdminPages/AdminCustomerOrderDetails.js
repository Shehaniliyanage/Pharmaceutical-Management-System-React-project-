import React from 'react'
import Navbar from '../AdminNavbar';
import Details from '../AdminCustomerOrdersDetails';

function AdminCustomerOrderDetails({adminAuth}) {
  return (
    <>
      {adminAuth || localStorage.getItem("AdminAuth", true) ? (<>
        <Navbar />
        <Details />
      </>) : (<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default AdminCustomerOrderDetails
