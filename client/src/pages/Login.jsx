import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handlesubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/login', {email, password})
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  }
  return (
    <>
    <form className='mt-3' onSubmit={handlesubmit}>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setemail(e.target.value) } />
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Password</label>
          <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password" onChange={(e) => setpassword(e.target.value) } />
        </div>
        <button type="submit" class="btn btn-primary mt-4">Log In</button>
      </form>
      <p className='container mt-3'>Dont have an Account?<Link to={'/register'}> Clicke here to create one!!</Link></p>
    </>
  )
}

export default Login