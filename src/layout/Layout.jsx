import React from 'react'

import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';

const Layout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className='flex justify-center'>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  )
}

export default Layout