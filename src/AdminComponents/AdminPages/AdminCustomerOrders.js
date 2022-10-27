import React from 'react'
import Navbar from '../AdminNavbar';
import Orders from '../AdminCustomerOrders';

function AdminCustomerOrders({ adminAuth }) {
  return (
    <>
      {adminAuth || localStorage.getItem("AdminAuth", true) ? (<>
        <Navbar />
        <Orders />
      </>) : (<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default AdminCustomerOrders
