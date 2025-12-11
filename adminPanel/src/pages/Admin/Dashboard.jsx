import React, {  useEffect } from 'react'
import { assets } from '../../assets/assets_admin/assets.js';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const {aToken,getDashboardData,dashData,cancelAppointment}=useContext(AdminContext);
  const {slotDateFormat}=useContext(AppContext);
  useEffect(() => {
    if(aToken)
    getDashboardData();
  },[aToken])
  return  dashData && (
    <div className='m-5'>
      <div className='flex felx-wrap gap-5'>
        <div className='flex items-center gap-3 bg-white border-2 border-gray-100 min-w-52 rounded p-5 shadow cursor-pointer hover:scale-105 transition-all'>
          <img className="w-14" src={assets.doctor_icon}></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
          
        </div>
        <div className='flex items-center gap-3 bg-white border-2 border-gray-100 min-w-52 rounded p-5 shadow cursor-pointer hover:scale-105 transition-all'>
          <img className="w-14" src={assets.appointments_icon}></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
          
        </div>
        <div className='flex items-center gap-3 bg-white border-2 border-gray-100 min-w-52 rounded p-5 shadow cursor-pointer hover:scale-105 transition-all'>
          <img className="w-14" src={assets.patients_icon}></img>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
          
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt=""></img>
          <p className='font-semibold'>Latest Booking</p>
        </div>
        <div className='pt-4 border border-t-0'>
       { dashData.latestAppointments.map((item,index)=>(
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'>
            <p className='max-sm:hidden'>{index+1}</p>
            <img src={item.doctorData.image} className='w-8 rounded-full bg-gray-200 hidden max-sm:block'/>
            <div className='flex-1'>
              <p className='text-gray-800 font-medium'>{item.doctorData.name}</p>
              <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
            </div>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}/>}
           
         
          
          </div>
        ))  }
        </div>

      </div>
      </div>
  )
}

export default Dashboard