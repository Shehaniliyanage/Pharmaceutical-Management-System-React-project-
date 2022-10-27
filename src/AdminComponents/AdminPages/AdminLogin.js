import React from 'react'
import AdminLoginForm from '../AdminLoginForm'

function AdminLogin({setAdminAuth}) {
  return (
    <>
      <AdminLoginForm setAdminAuth={setAdminAuth}/>
    </>
  )
}

export default AdminLogin
