import React from 'react'
import CustomerSignupForm from '../CustomerSignupForm';

function CustomerSignup({setIsAuth}) {
  return (
    <>
        <CustomerSignupForm setIsAuth={setIsAuth}/>
    </>
  )
}

export default CustomerSignup
