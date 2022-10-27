import React from 'react'
import SupplierLoginForm from '../SupplierLoginForm';

function SupplierLogin({setSupplierAuth,setSupplierId}) {
  return (
    <>
        <SupplierLoginForm setSupplierAuth={setSupplierAuth} setSupplierId={setSupplierId}/>
    </>
  )
}

export default SupplierLogin
