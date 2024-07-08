import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/Authcontext'

const Navbar = () => {
  const { user , setuser} = useContext(AuthContext);
  const clearUser = () =>{
    setuser(null);
    localStorage.removeItem("token");
  }
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
            {user ? <>
            <li class="nav-item">
              <Link class="nav-link" to={'/create'}>Create contact</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to={'/mycontacts'}>My contacts</Link>
            </li>
              <li class="nav-item">
                <button onClick={clearUser} className='btn btn-danger'>Logout</button>
              </li></> :
              <>
                <li class="nav-item">
                  <Link class='nav-link' to={'/register'}>Register</Link>
                </li>
                <li class="nav-item">
                  <Link class='nav-link' to={'/login'}>Log In</Link>
                </li>
              </>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar