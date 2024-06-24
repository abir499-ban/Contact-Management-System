import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handlesubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/register', {name, email, password}).then((data)=> console.log(data))
    .catch((err) => console.log(err));
  }
  return (
    <>
    <h1>Register</h1>
      <form className='mt-3' onSubmit={handlesubmit}>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
          <input value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter full name" onChange={(e) => setname(e.target.value) } required/>
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
          <input value={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setemail(e.target.value) } required/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Password</label>
          <input value={password} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password" onChange={(e) => setpassword(e.target.value) } required/>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Register</button>
      </form>
      <p className='container mt-3'>Already have an account? <Link to={'/login'}> Click here to log in</Link></p>
    </>
  )
}

export default Register