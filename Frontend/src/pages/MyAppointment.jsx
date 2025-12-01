import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import axios from 'axios';
import {toast} from "react-toastify";
import { set } from 'mongoose';

const MyAppointment = () => {
  const {backendUrl,token}=useContext(AppContext);
  const [loading,setLoading]=React.useState(false);

  const [appointments,setAppointments]=React.useState([]);
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
  const formatDate=(dateStr)=>{
    const dateArray=dateStr.split("-");
    return dateArray[0]+" "+months[parseInt(dateArray[1])-1]+" "+dateArray[2];
  }
  const getMyAppointments=async()=>{
    try{
      setLoading(true);
      const {data}=await axios.get(`${backendUrl}/user/my-appointments`,{
        headers:{
          authorization:`Bearer ${token}`,
        },
      });
      if( (data.length >0) && data.success){
        setAppointments(data.appointments);
      }
      else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error("Error fetching appointments:", error.message);
    }
  };
  React.useEffect(()=>{
    if(token)
    getMyAppointments();
  },[token]);
  return (appointments.length >0 ? 
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {appointments.slice(0,2).map((item,index)=>( 
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
          <div>
            <img className="w-32 bg-indigo-50" src={item.docData.image} alt=""/>
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{item.docData.address.line1}</p>
            <p className='text-xs'>{item.docData.address.line2}</p>
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium '>Date & Time:</span> {formatDate(item.slotDate)}| {item.slotTime}</p>
          </div> 
          <div></div>
          <div className='flex flex-col gap-2 justify-end'>
            <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 px-1 border rounded  hover:bg-primary hover:text-white transition-all duration-300' >Pay Online</button>
             <button className='px-1 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
          </div>
          </div>


        ))}
      </div>
    </div>
    :
    <div className='p-6'>
      <h1 className='text-2xl text-gray-700 font-medium'>No appointments found</h1>
    </div>
  )
}

export default MyAppointment