import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { assets } from '../assets/assets_admin/assets.js';
import { NavLink } from 'react-router-dom';

const sidebar = () => {
    const {aToken}=useContext(AdminContext);    
  return (
    <div className='min-h-screen bg-white border-r shadow-md'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/adminDashboard'}>
                    <img src={assets.home_icon} alt=""></img>
                    <p>Dashboard</p>
                </NavLink>
                <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/allAppointments'}>
         
                    <img src={assets.appointment_icon} alt=""></img>
                    <p>Appointments</p>
                </NavLink>
                <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/addDoctor'}>
                    <img src={assets.add_icon} alt=""></img>
                    <p>Add Doctor</p>
                </NavLink>
                 <NavLink  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/doctorList'}>
                    <img src={assets.people_icon} alt=""></img>
                    <p>Doctors List</p>
                </NavLink>
            </ul>
            
        }
    </div>
  )
}

export default sidebar