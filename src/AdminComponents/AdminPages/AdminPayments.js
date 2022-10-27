import React from 'react'
import Navbar from '../AdminNavbar';
import Payment from '../AdminPayments';

function AdminPayments({adminAuth}) {
  return (
    <>
      {adminAuth || localStorage.getItem("AdminAuth", true) ? (<>
        <Navbar />
        <Payment />
      </>) : (<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default AdminPayments
