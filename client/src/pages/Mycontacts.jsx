import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/Authcontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';

const Mycontacts = () => {
  const { user } = useContext(AuthContext);
  const [loading, setloading]  = useState(false);
  const id = user ? user._id : null;
  const Data = {
    id: id,
  }
  const [allContacts, setallContacts] = useState([]);

  const getallcontacts = async()=>{
    setloading(true);
    try {
      const res = await fetch('http://localhost:8000/api/contact/mycontacts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...Data })
      })
      const result = await res.json();
      if (!result.Error) {
        setallContacts(result.message);
        //toast.success("Sucessfully retreived contacts")
        setloading(false)
      } else {
        toast.error(result.Error);
        setloading(false)
      }
    }
    catch (err) {
      setloading(false);
      console.log(err.message);
    }
  }

  useEffect(() => {
    getallcontacts();
  }, [])

  useEffect(() => {
    console.log(allContacts);
  }, [allContacts])

  return (
    <>
      <ToastContainer autoClose={2000} />
      <h3>{user ? user.name : null}</h3>
      <h2 className='mt-5'>My Contacts</h2>
      {loading ? <Spinner splash="...Loading Contacts" /> : (<table class="table table-hover">
        <thead>
          <tr class="table-dark" >
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Email Address</th>
          </tr>
        </thead>
        <tbody>
          {allContacts.map((contact) => (
            <tr class="table-secondary" key={contact._id}>
              <th scope="row">{contact.name}</th>
              <td>{contact.address}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>)}



      {/* 
       */}
    </>
  )
}

export default Mycontacts