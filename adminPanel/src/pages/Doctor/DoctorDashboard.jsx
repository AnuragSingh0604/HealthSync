import React from 'react'
import { useContext ,useEffect} from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets.js';
import { AppContext } from '../../context/AppContext';  
const DoctorDashboard = () => {
  const {dToken,dashData,getDatshData,completeAppointment,cancelAppointment}=useContext(DoctorContext);
  const {formatDate}=useContext(AppContext);
  useEffect(()=>{
    if(dToken)
    getDatshData();
  },[dToken]);
  console.log(dashData.latestAppointments);
  return dashData && (
    <div className='w-full max-w-6xl m-5'>
          <div className='flex felx-wrap gap-5'>
            <div className='flex items-center gap-3 bg-white border-2 border-gray-100 min-w-52 rounded p-5 shadow cursor-pointer hover:scale-105 transition-all'>
              <img className="w-14" src={assets.earning_icon}></img>
              <div>
                <p className='text-xl font-semibold text-gray-600'>$ {dashData.totalEarnings}</p>
                <p className='text-gray-400'>Earnings</p>
              </div>
              
            </div>
            <div className='flex items-center gap-3 bg-white border-2 border-gray-100 min-w-52 rounded p-5 shadow cursor-pointer hover:scale-105 transition-all'>
              <img className="w-14" src={assets.appointments_icon}></img>
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashData.totalAppointments}</p>
                <p className='text-gray-400'>Appointments</p>
              </div>
              
            </div>
            <div className='flex items-center gap-3 bg-white border-2 border-gray-100 min-w-52 rounded p-5 shadow cursor-pointer hover:scale-105 transition-all'>
              <img className="w-14" src={assets.patients_icon}></img>
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashData.totalPatients}</p>
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
                <img src={item.userData.image} alt="" className='w-8 rounded-full bg-gray-200 hidden max-sm:block'/>
                <div className='flex-1'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600'>{formatDate(item.slotDate)}</p>
                </div>
                {
                             item.cancelled?
                             <p className='text-red-400 text-xs font-medium'>cancelled</p>:item.isCompleted?<p className='text-green-500 text-xs font-medium'>completed</p>
                             :<div className='flex'>
                             <img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt=""></img>
                             <img onClick={()=>completeAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt=""></img>
                             </div>
                           }
               
             
              
              </div>
            ))  }
            </div>
    
          </div>
          </div>
  )
}

export default DoctorDashboard