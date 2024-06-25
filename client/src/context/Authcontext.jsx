import {createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
    const [user,setuser]  =useState(null);

    //login
    const loginUser = async (UserData) =>{
        try {
            const res  = await fetch('http://localhost:8000/api/user/login',{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify({...UserData})
            })

            const result = await res.json();
            if(!result.message){
                console.log(result.token);
                localStorage.setItem('token', result.token);
                toast.success("Sucessfull login!!");
            }else{
                console.log(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //register
    const registerUser = async(userData) =>{
        try{
            const res = await fetch('http://localhost:8000/api/user/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({...userData})
            })
    
            const result = await res.json();
            if(!result.message){
                console.log(result.user);
                toast.success("Account created succesfully!!");
            }else{
                console.log(result.message);
                toast.error(result.message);
            }
        }catch(err){
            console.log(err);
        }
    }
    return <AuthContext.Provider value={{loginUser, registerUser}}>
        {children}
        </AuthContext.Provider>
}


export default AuthContext;
export {AuthContextProvider}