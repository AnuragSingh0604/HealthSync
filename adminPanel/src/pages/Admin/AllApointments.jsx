import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets.js';


const AllApointments = () => {
  const {aToken,appointments,getAllAppointments,cancelAppointment} = useContext(AdminContext);
  const {calculateAge}=useContext(AppContext);
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 
  const formatDate=(dateStr)=>{
    const dateArray=dateStr.split("-");
    return dateArray[0]+" "+months[parseInt(dateArray[1])-1]+" "+dateArray[2];
  }
  useEffect(() => {
    if(aToken)
    getAllAppointments(aToken);
  },[aToken])
  return (

    <div className='w-full max-w-6xl m-5'>
      <h1 className='mb-3 text-lg font-medium'>All Appointments</h1>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item,index)=>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index+1}</p>
           <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full'/> <p>{item.userData.name}</p>
           </div>
           <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{formatDate(item.slotDate)},{item.slotTime}</p>
           <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full bg-gray-200' src={item.doctorData.image}/> <p>{item.doctorData.name}</p>
           </div>
           <p>${item.amount}</p>
           {
            item.cancelled?<p className='text-red-400 text-xs font-medium'>Cancelled</p>:
            <img onClick={()=>cancelAppointment(item._id)}className='w-10 cursor-pointer' src={assets.cancel_icon}/>
          }
          
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default AllApointments;