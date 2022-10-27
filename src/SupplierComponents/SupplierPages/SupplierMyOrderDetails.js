import React from 'react'
import Navbar from '../SupplierNavbar';
import Details from '../SupplierOrdersDetails';

function SupplierMyOrderDetails({supplierAuth}) {
  return (
    <>
    {supplierAuth || localStorage.getItem("SupplierAuth", true)?(<>
      <Navbar/>
      <Details/>
      </>):(<>
        {window.location.pathname = '/supplierlogin'}
      </>)}
    </>
  )
}

export default SupplierMyOrderDetails
