import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div className='container'>
       <Navbar/>
       <div className='container mt-3'>{children}</div>
    </div>
  )
}

export default Layout