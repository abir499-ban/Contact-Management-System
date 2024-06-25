import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/Authcontext';

const Register = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const { registerUser } = useContext(AuthContext);

  const handlesubmit = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:8000/api/user/register', {name, email, password}).then((data)=> console.log(data))
    // .catch((err) => console.log(err));
    if (confirmpassword !== password) {
      toast.error("Password do not match!!");
      return;
    }
    const Data = {
      name: name,
      email: email,
      password: password,
    }

    registerUser(Data);
  }
  return (
    <>
      <ToastContainer autoClose={2000} />
      <h1>Register</h1>
      <form className='mt-3' onSubmit={handlesubmit}>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
          <input value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter full name" onChange={(e) => setname(e.target.value)} required />
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
          <input value={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} required />
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Password</label>
          <input value={password} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password" onChange={(e) => setpassword(e.target.value)} required />
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Confirm Password</label>
          <input value={confirmpassword} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setconfirmpassword(e.target.value)} placeholder='Confirm your password' required />
        </div>
        <button type="submit" class="btn btn-primary mt-4">Register</button>
      </form>
      <p className='container mt-3'>Already have an account? <Link to={'/login'}> Click here to log in</Link></p>
    </>
  )
}

export default Register