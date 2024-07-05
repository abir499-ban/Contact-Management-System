import React, { useContext, useEffect, useMemo, } from 'react'
import AuthContext from '../context/Authcontext'
import {useNavigate} from 'react-router-dom'
const D = () => {
  // const navigate = useNavigate();
  // const {user}  = useContext(AuthContext)
  // const memoizeduser = useMemo(()=>user, [user]);
  // useEffect(() =>{
  //   console.log("useEffect triggered");
  //   console.log("user from context: ", memoizeduser);
  //   if(!memoizeduser){
  //     navigate("/login", {replace:true})
  //   }
  // }, [!memoizeduser, navigate])

  return (
    <div>Welcome to Contact Management System</div>
  )
}

export default D