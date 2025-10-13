import React from 'react';
import { useState } from 'react';
import {assets} from '../assets/assets_frontend/assets';

const Myprofile = (
  
  
) => {
  const [isEdit,setIsEdit]=useState(true); 
  const [userdata,setUserdata]=useState({name:"Edward Vincent",image:assets.profile_pic,
  email:"richardjameswap@gmail.com",
  phone:'+1 123 456 7890',
  address:{
    line1:"57th Cross, Richmond",
    line2:"Circle,Church Road, London"
  },
  gender:"Male",
  dob:"2000-01-20"})
  return (
    <div className=' max-w-lg flex flex-col gap-2 text-sm '>
     <img  className="w-36 rounded" src={userdata.image} alt=""></img>
     {
      isEdit ?
      <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" type="text" value={userdata.name} onChange={e=>setUserdata(prev=>({...prev,name:e.target.value}))}></input>
      :<p className='font-medium text-3xl text-neutral-800 mt-4'>{userdata.name}</p>
     }
     <hr className='bg-zinc-400 h-[1px] border-none'/>
     <div>
      <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Email id:</p>
        <p className='text-blue-500'>{userdata.email}</p>
        <p className='font-medium'>Phone:</p>
        {
        isEdit ?
      <input className='bg-gray-100 max-w-52' type="text" value={userdata.phone} onChange={e=>setUserdata(prev=>({...prev,phone:e.target.value}))}></input>
      :<p className='text-blue-400'>{userdata.phone}</p>
        }
        <p className='font-medium'>Address:</p>
        {
        isEdit ?
        <p >
          <input className="bg-gray-50" onChange={(e)=>setUserdata(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))}  value={userdata.address.line1} type="text"/>
          <br/>
          <input className="bg-gray-50" onChange={(e)=>setUserdata(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={userdata.address.line2} type="text"/>
        </p>
        :<p className='text-gray-500'>{userdata.address.line1}<br/>{userdata.address.line2} 
        </p>
      
        }
      </div>


     </div>
     <div>
      <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className="font-medium">Gender:</p>
        {
        isEdit ?
        <select className="max-w-20 bg-gray-100" value={userdata.gender} onChange={e=>setUserdata(prev=>({...prev,gender :e.target.value}))}>
          <option value ="Male">Male</option> 
          <option value ="Female">Female</option>  
         </select>  :<p className="text-gray-400">{userdata.gender}</p>
        }
        <p className='font-medium'>Date of Birth:</p>
        {
        isEdit ?
        <input className="max-w-28 bg-gray-100" type="date" value={userdata.dob} onChange={e=>setUserdata(prev=>({...prev,dob:e.target.value}))}></input>
        :<p className='text-gray-400' > {userdata.dob}</p>
        }
      </div>
     </div>
     <div>
      {
        isEdit ? 
        <div className=' mt-10'>
          <button className="border border-primary mx-2 px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={()=>setIsEdit(false)}>Cancel</button>
          <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={()=>setIsEdit(false)}>Save</button>
        </div>
        :<div className='mt-10'>
          <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={()=>setIsEdit(true)}>Edit</button>
        </div>
      }                                                                                                 
     </div>

    </div>
  )
}

export default Myprofile