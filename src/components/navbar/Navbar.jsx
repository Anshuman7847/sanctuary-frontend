import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">Sanctuary</Link>
        <nav className="space-x-4">
          <Link to="/register" className="text-sm text-gray-600 hover:text-indigo-600">Register</Link>
          <Link to="/login" className="text-sm text-gray-600 hover:text-indigo-600">Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
