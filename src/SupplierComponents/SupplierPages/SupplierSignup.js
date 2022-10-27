import React from 'react'
import SupplierSignupForm from '../SupplierSignupForm';
import AdminNavbar from '../../AdminComponents/AdminNavbar';

function SupplierSignup({adminAuth}) {
  return (
    <>
    {adminAuth?(<>
      <AdminNavbar/>
      <SupplierSignupForm/>
      </>):(<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default SupplierSignup
