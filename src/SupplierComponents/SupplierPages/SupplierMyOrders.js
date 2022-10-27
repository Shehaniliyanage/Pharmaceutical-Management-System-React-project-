import React from 'react'
import NavBar from '../SupplierNavbar';
import SupplierOrders from '../SupplierOrders';

function SupplierMyOrders({ supplierAuth , supplierId}) {
  return (
    <>
      {supplierAuth || localStorage.getItem("SupplierAuth", true) ? (<>
        <NavBar />
        <SupplierOrders supplierId={supplierId}/>
      </>) : (<>
        {window.location.pathname = '/supplierlogin'}
      </>)}
    </>
  )
}

export default SupplierMyOrders
