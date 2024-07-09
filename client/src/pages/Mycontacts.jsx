import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/Authcontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal} from 'react-bootstrap'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Mycontacts = () => {
  const { user } = useContext(AuthContext);
  const [loading, setloading]  = useState(false);
  const [showModal, setshowModal]  = useState(false);
  const [ModalData, setModalData]  = useState({});
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

  const deleteContact = async(id)=>{
    try {
      const res = await fetch(`http://localhost:8000/api/contact/deleteContact/${id}`, {
        method:"DELETE"
      })
      const result = await res.json();
      if(!result.Error){
        toast.success(result.message);
      }else{
        toast.error(result.Error);
      }
    } catch (err) {
      console.log(err);
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
      <h2 className='mt-5'>My Contacts ({allContacts.length})</h2>
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
            <tr class="table-secondary" key={contact._id} onClick={()=>{
              setshowModal(true);
              setModalData({});
              setModalData(contact);
            }}>
              <th scope="row">{contact.name}</th>
              <td>{contact.address}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>)}

      <Modal show={showModal} onHide={()=> setshowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ModalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>Address: </strong>{ModalData.address}</p>
          <p><strong>Email: </strong>{ModalData.email}</p>
          <p><strong>Phone: </strong>{ModalData.phone}</p>
        </Modal.Body>

        <Modal.Footer>
          <Link className='btn btn-info'
          to={`/editcontact/${ModalData._id}`}>
          Edit
          </Link>
          <button className='btn btn-danger'
          onClick={()=>deleteContact(ModalData._id)}>
            Delete Contact</button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Mycontacts