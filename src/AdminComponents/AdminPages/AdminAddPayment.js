import React from 'react'
import Navbar from '../AdminNavbar';
import Addpayment from '../AdminAddPayment';

function AdminAddPayment({adminAuth}) {
  return (
    <>
      {adminAuth || localStorage.getItem("AdminAuth", true) ? (<>
        <Navbar />
        <Addpayment />
      </>) : (<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default AdminAddPayment
