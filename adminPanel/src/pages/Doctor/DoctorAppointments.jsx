import React from 'react'
import { useContext,useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets.js';

const DoctorAppointments = () => {
  const {dToken,appointments,getAppointmentsByDoctor,completeAppointment,
        cancelAppointment}=useContext(DoctorContext); 
  const {calculateAge,formatDate,}=useContext(AppContext);
  
  console.log(appointments);
  useEffect(()=>{
    if(dToken){
      
      getAppointmentsByDoctor();
      
      
    }
  },[dToken]);
  
 
  return (
    <div className='w-full max-w-6xl m-5'>
     <p className='mb-3 text-lg font-medium'>All Appointments</p>
     <div className='bg-white border rounded text-sm  min-h-[100vh] overflow-y-scroll]'>
      <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b font-medium text-gray-600'>
        <p>#</p>
         <p>Patient</p>
          <p>Payment</p>
           <p>Age</p>
            <p>Date & Time</p>
             <p>Fees</p>
              <p>Action</p>

      </div>
      {

        appointments.length>0 ? appointments.reverse().map((appointment,index)=>(
          <div key={index} className='flex flex-wrap justify-between mx-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={appointment.userData.image} alt="" ></img>
              <p className='text-gray-700'>{appointment.userData.name}</p>
            </div>
            <div>
              <p  className='text-xs inline border border-primary px-2 rounded-full'>{appointment.payment ? 'Online' : 'CASH'}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(appointment.userData.dob)}</p>
            <p>{formatDate(appointment.slotDate)},{appointment.slotTime}</p>
            <p>$ {appointment.amount}</p>
            {
              appointment.cancelled?
              <p className='text-red-400 text-xs font-medium'>cancelled</p>:appointment.isCompleted?<p className='text-green-500 text-xs font-medium'>completed</p>
              :<div className='flex'>
              <img onClick={()=>cancelAppointment(appointment._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt=""></img>
              <img onClick={()=>completeAppointment(appointment._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt=""></img>
              </div>
            }
            
           
            
          </div>
        ))
        :
        <p className='text-center py-10 text-gray-500'>No appointments found</p>
      }
     
     </div>

    </div>
  )
}


export default DoctorAppointments