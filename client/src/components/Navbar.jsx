import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
       <Link to={'/'}>
       <a class="navbar-brand">CMS</a></Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link class='nav-link' to={'/register'}>Register</Link>
            </li>
            <li class="nav-item">
            <Link class='nav-link' to={'/login'}>Log In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar