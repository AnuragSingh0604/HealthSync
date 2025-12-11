import axios from 'axios';
import { createContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
export const AdminContext =createContext();
const AdminContextProvider =(props)=>{
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem("aToken"):"");
   const [doctors,setDoctors]=useState([]);
   const [appointments,setAppointments]=useState([]); 
   const [dashData,setDashData]=useState(false);
    const backendUrl=import.meta.env.VITE_BACKEND_URL; 
    const getAllDoctors=async()=>{
        try{
            const {data}=await axios.get(`${backendUrl}/admin/all-doctors`,{
                headers:{
                   Authorization: `Bearer ${aToken}`,
                }
            });
           
            if(data.success){
                setDoctors(data.doctors);
                
        }
        else{
            toast.error("Failed to fetch doctors");
        }
    }
        catch(error){
            toast.error(error.message);
            
        }};
    const changeAvailability=async(doctorId)=>{
        try{
            const {data}=await axios.post(`${backendUrl}/admin/change-availability`,{doctorId},{
                headers:{
                   Authorization: `Bearer ${aToken}`,
                }
            });
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
        }
        else{
            toast.error("Failed to change availability");
        }
    }
        catch(error){
            toast.error(error.message);
            
        }};   
        const getAllAppointments=async()=>{
            try{
                const {data}= await axios.get(`${backendUrl}/admin/appointments`,{headers:{
                    Authorization: `Bearer ${aToken}`,
                }})
                if(data.success){
                    setAppointments(data.appointments);
                   
                    

                }
                else{
                    toast.error(data.message)
                }
            }
            catch(error){
                toast.error(error.message)
            }
        } 
        const cancelAppointment=async (appointmentId)=>{
            try{
                const {data}= await axios.post(`${backendUrl}/admin/cancel-apponitment`,{appointmentId},{headers:{
                    Authorization: `Bearer ${aToken}`,
                }})
                if(data.success){
                    toast.success(data.message);
                    getAllAppointments();
                }
                else{
                    toast.error(data.message)
                }

            }
            catch(error){
                toast.error(error.message)
            }
        }
        const getDashboardData=async()=>{
            try{
                const {data}= await axios.get(`${backendUrl}/admin/dashboard`,{headers:{
                    Authorization: `Bearer ${aToken}`,
                }})
                if( data && data.success){
                    setDashData(data.dashboardData);
                }
                else{
                    toast.error(data.message)
                }

            }
            catch(error){
                toast.error(error.message)
            }
        }
        
    const value={
        aToken,
        setAToken,
        backendUrl,doctors,getAllDoctors,changeAvailability
        ,appointments,setAppointments,getAllAppointments,cancelAppointment,
        getDashboardData,dashData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;
    
