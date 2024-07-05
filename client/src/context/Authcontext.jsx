import {createContext, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{
    const [user,setuser]  = useState(null);
    useEffect(()=>{
        checkUserLoggedIn();
    }, [])


    //check if user is logged in
    const checkUserLoggedIn = async() =>{
        try{
            let auth = null;
            if(localStorage.getItem("token"))
                auth = localStorage.getItem("token");
            const res = await fetch("http://localhost:8000/api/user/me",{
                method:"GET",
                headers:{
                    authorization: `${auth}`,
                },
            })
            const result = await res.json();
            if(!result.message){
                console.log("Authenticated");
                setuser(result.user);
            }else{
                console.log(result.message);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
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
                localStorage.setItem('token', result.token);
                toast.success("Sucessfull login!!");
                setuser(result.sanitizedUser);
            }else{
                console.log(result.message);
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error.message);
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
    return <AuthContext.Provider value={{loginUser, registerUser, user, setuser}}>
        {children}
        </AuthContext.Provider>
}


export default AuthContext;
export {AuthContextProvider}