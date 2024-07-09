import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/Authcontext';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editcontact = () => {
    const {user} = useContext(AuthContext)
    const {id} = useParams();

    const [name, setname] = useState("");
    const[address, setaddress] = useState("");
    const[email, setemail] = useState("");
    const[phone, setphone] = useState();

    const [loading, setloading] = useState(false);


    const handleEdit = async(e)=>{
        e.preventDefault();
        const Data = {
          name,
          address,
          email,
          phone,
        }
    
        try {
            const res = await fetch(`http://localhost:8000/api/contact/editcontact/${id}`,{
                method:"PUT",
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
        } catch (error) {
            console.log(error);
        }
      }

    const getcontact = async()=>{
        setloading(true)
        try {
            const res = await fetch(`http://localhost:8000/api/contact/getcontact/${id}`,{
                method:"GET"
            })
            const result = await res.json();
            setloading(false)
            if(!result.Error){
                console.log(result.message);
                setname(result.message.name);
                setemail(result.message.email);
                setaddress(result.message.address);
                setphone(result.message.phone);
            }else{
                console.log(result.Error)
            }
        } catch (error) {
            setloading(false)
            console.log(result.Error);
        }
    }
   
    useEffect(()=>{
        getcontact();
    }, [])
  return (
    <>
     {loading ? <Spinner splash="...loading" /> : (<div class="jumbotron">
        <ToastContainer autoClose={2000} />
        <h3>{user ? user.name : null}</h3>
        <h2 className='mt-5'>Edit your contact</h2>

        <form onSubmit={handleEdit} className='mt-3'>
        <div>
          <label for="exampleInputEmail1" class="form-label mt-4">Name</label>
          <input  type="text" value={name} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter first name of contact" onChange={(e)=> setname(e.target.value)} required/>
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
        <button type='submit' className='mt-3 btn btn-success'>Save Edit</button>
      </form>
      </div>

     )}
    
    </>
  )
}

export default Editcontact