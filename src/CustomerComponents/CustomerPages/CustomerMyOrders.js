import React from 'react'
import Navbar from '../CustomerNavbar';
import Orders from '../CustomerOrders';

function CustomerMyOrders({ isAuth }) {
  return (
    <>
      {isAuth || localStorage.getItem("isAuth",true) ? (
        <>
          <Navbar />
          <Orders />
        </>
      ) : (<>
        {window.location.pathname = '/customerlogin'}
      </>)}
    </>
  )
}

export default CustomerMyOrders
