import React from 'react'
import Suppliers from '../AdminSuppliers'
import Navbar from '../AdminNavbar';

function AdminSuppliers({adminAuth}) {
  return (
    <>
      {adminAuth || localStorage.getItem("AdminAuth", true) ? (<>
        <Navbar />
        <Suppliers />
      </>) : (<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default AdminSuppliers
