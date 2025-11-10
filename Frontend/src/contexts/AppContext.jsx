import { createContext } from "react";
import { useState } from "react";
import axios from "axios";  
import {toast} from "react-toastify";
import { useEffect } from "react";

export const AppContext = createContext(null);
export const AppProvider = (props) => {
    const currencySymbol="$";
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors]=useState([]);
    const [userData,setUserData]=useState(null);
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):false);
    const getAllDoctors=async()=>{
        try{
            const {data}=await axios.get(`${backendUrl}/doctor/list`);
           
            if(data.success){
                setDoctors(data.doctors);
        }
        else{
            toast.error(data.message);
        }
        }catch(error){
            toast.error("Error fetching doctors:", error.message);
        }
    };
    const loadUserData=async()=>{
        try{
            const {data}=await axios.get(`${backendUrl}/user/profile`,{
                headers:{                           
                    Authorization:`Bearer ${token}`
                }
            });
            if(data.success){
                setUserData(data.user);
            }
            else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error("Error fetching user data:", error.message);
        }
    }
    useEffect(()=>{
        getAllDoctors();
    },[doctors,setDoctors]);
    useEffect(()=>{
        if(token){
            loadUserData();
        }
        else{
            setUserData(false);
        }
    },[token]);
            
    const value={
        doctors,currencySymbol,token,setToken,backendUrl,userData,setUserData,loadUserData
    }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}
export default AppProvider;