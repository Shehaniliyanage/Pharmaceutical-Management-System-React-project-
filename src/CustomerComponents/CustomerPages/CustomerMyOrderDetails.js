import React from 'react'
import Navbar from '../CustomerNavbar';
import Details from '../CustomerOrdersDetails';

function CustomerMyOrderDetails({ isAuth }) {
  return (
    <>
      {isAuth || localStorage.getItem("isAuth",true) ? (
        <>
          <Navbar />
          <Details />
        </>
      ) : (<>
        {window.location.pathname = '/customerlogin'}
      </>)}
    </>
  )
}

export default CustomerMyOrderDetails
