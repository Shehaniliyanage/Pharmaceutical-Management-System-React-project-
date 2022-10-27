import React from 'react'
import Navbar from '../AdminNavbar';
import Form from '../AdminSupplierOrderForm';

function AdminSupplierOrder({adminAuth}) {
  return (
    <>
      {adminAuth || localStorage.getItem("AdminAuth", true) ? (<>
        <Navbar />
        <Form />
      </>) : (<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default AdminSupplierOrder
