import React, { useContext, useEffect, useMemo, } from 'react'
import AuthContext from '../context/Authcontext'
import { useNavigate } from 'react-router-dom'
const D = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // useEffect(() =>{
  //   !user && navigate('/login', {replace:true})
  // }, [])
  return (
    <>
      <div class="jumbotron">
        <h1 class="display-4">Welcome to Contact Management System!!</h1>
        <h3>{user ? user.name : null}</h3>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <p class="lead">
            <a class="btn btn-primary" href="#" role="button">Learn more</a>
          </p>
      </div>
    </>
  )
}

export default D