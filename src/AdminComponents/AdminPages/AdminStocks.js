import React from 'react'
import Navbar from '../AdminNavbar';
import View from '../AdminStocksView';

function AdminStocks({adminAuth}) {
  return (
    <>
      {adminAuth || localStorage.getItem("AdminAuth", true) ? (<>
        <Navbar />
        <View />
      </>) : (<>
        {window.location.pathname = '/adminlogin'}
      </>)}
    </>
  )
}

export default AdminStocks
