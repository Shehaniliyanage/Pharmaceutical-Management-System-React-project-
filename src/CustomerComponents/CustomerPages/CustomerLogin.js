import React from 'react'
import CustomerLoginForm from '../CustomerLoginForm'

function CustomerLogin({setIsAuth}) {
  return (
    <>
      <CustomerLoginForm setIsAuth={setIsAuth}/>
    </>
  )
}

export default CustomerLogin
