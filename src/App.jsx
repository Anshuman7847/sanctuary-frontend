import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
   <>
    <RouterProvider router={routes}/>
    <ToastContainer/>
   </>
  )
}

export default App