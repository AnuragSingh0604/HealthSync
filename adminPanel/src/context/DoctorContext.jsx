import axios from 'axios';
import { createContext,useState } from 'react';
import { toast } from 'react-toastify';
export const DoctorContext =createContext();
const DoctorContextProvider =(props)=>{
    const backendUrl =import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem("dToken"):"");
    const [appointments,setAppointments]=useState([]);
    const getAppointmentsByDoctor=async()=>{
        try{
        const {data}=await axios.post(`${backendUrl}/doctor/appointments-by-doctor`,{},{
                headers:{
                   Authorization: `Bearer ${dToken}`,
                }
            });
            if(data.success){
                setAppointments(data.appointments);
            }
            else{
                setAppointments([]);
                toast.error(data.message);
            }
        }catch(error){
            console.error("Error fetching appointments:",error);
            toast.error(error.message);
        }
           
    };
    const completeAppointment=async(appointmentId)=>{
        try{
            const {data}=await axios.post(`${backendUrl}/doctor/appointment-completed`,{appointmentId},{
                headers:{
                   Authorization: `Bearer ${dToken}`,
                }
            });
            if(data.success){
                toast.success(data.message);
                getAppointmentsByDoctor();
            }
            else{
                toast.error(data.message);
            }
        }catch(error){
            console.error("Error completing appointment:",error);
            toast.error(error.message);
        }
    };
    const cancelAppointment=async(appointmentId)=>{
        try{
            const {data}=await axios.post(`${backendUrl}/doctor/appointment-cancelled`,{appointmentId},{
                headers:{
                   Authorization: `Bearer ${dToken}`,
                }
            });
            if(data.success){
                toast.success(data.message);
                getAppointmentsByDoctor();
            }
            else{
                toast.error(data.message);
            }
        }catch(error){
            console.error("Error cancelling appointment:",error);
            toast.error(error.message);
        }
    };

    const value={
         
        backendUrl,
        dToken,
        setDToken,
        appointments,
        getAppointmentsByDoctor,
        completeAppointment,
        cancelAppointment
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider;
    
