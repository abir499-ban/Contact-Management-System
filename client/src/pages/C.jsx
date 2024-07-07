import React, { useContext } from 'react'
import AuthContext from '../context/Authcontext'

export const C = () => {
    const {user} = useContext(AuthContext);
  return (
    <>
    <div class="jumbotron">
        <h3>{user ? user.name : null}</h3>
        <h2 className='mt-5'>Create your contact</h2>
        <button className='btn btn-primary'>Submit</button>
      </div>
    </>
  )
}
