import React from 'react'
import {Link} from 'react-router-dom'; 

const Navbar = ()=> {
  return (
    <nav className='nav-wrapper grey darken-4'>
      <div className='container'>
      <Link to='/' className='brand-logo'> Agile Project</Link>
      </div>
    </nav>
  )
}

export default Navbar; 