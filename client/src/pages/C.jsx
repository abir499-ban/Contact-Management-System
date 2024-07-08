import React, { useContext, useState } from 'react'
import AuthContext from '../context/Authcontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const C = () => {
  const {user} = useContext(AuthContext);

  const[firstname, setfirstname] = useState("");
  const[lastname, setlastname] = useState("");
  const[address, setaddress] = useState("");
  const[email, setemail] = useState("");
  const[phone, setphone] = useState();


  const handleContactSubmit = async(e)=>{
    e.preventDefault();
    const name = firstname + " " + lastname;
    const Data = {
      name,
      address,
      email,
      phone,
      postedBy: user._id
    }
    console.table(Data);

    const res = await fetch('http://localhost:8000/api/contact/createcontact',{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({...Data})
    })
    const result = await res.json();
    if(!result.Error){
      toast.success(result.message);
    }else{
      toast.error(result.Error);
    }
  }

  return (
    <>
    <ToastContainer autoClose={2000} />
    <div class="jumbotron">
        <h3>{user ? user.name : null}</h3>
        <h2 className='mt-5'>Create your contact</h2>

        <form onSubmit={handleContactSubmit} className='mt-3'>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">First Name</label>
          <input  type="text" value={firstname} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter first name of contact" onChange={(e)=> setfirstname(e.target.value)} required/>
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Last Name</label>
          <input  type="text" value={lastname} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter last name of contact"  onChange={(e)=> setlastname(e.target.value)} required/>
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Address</label>
          <input  type="text" value={address} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address" onChange={(e)=> setaddress(e.target.value)} required  />
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
          <input  type="email" value={email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=> setemail(e.target.value)} required />
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Phone Number(INDIA: +91)</label>
          <input  type="number" value={phone} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone number" onChange={(e)=> setphone(e.target.value)} required/>
        </div>
        <button type='submit' className='mt-3 btn btn-success'>Create Contact</button>
      </form>
      </div>
    </>
  )
}
