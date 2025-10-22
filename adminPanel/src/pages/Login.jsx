import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets';
import { useState } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { data } from 'react-router-dom';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {setAToken,backendUrl}=useContext(AdminContext);
    const handleSubmit=async(e)=>{
           
        e.preventDefault();
    try{
  if(state==='Admin'){
    const response=await axios.post(`${backendUrl}/api/admin/login`,{email,password});
    if(response.data.success){
        localStorage.setItem("aToken",response.data.token);
    setAToken(response.data.token);
    }
    else{
    toast.error(data.message );
  }
    
  }
  
  
    } catch(err){
        console.log(err);
    }
}

       
  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center '>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'><p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p> 
      <div className='w-full'>
        <p>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required></input>
      </div>
      <div>
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required></input>
      </div>
      <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
      {state==='Admin'?
      <p className='text-sm'>Login as <span  onClick={()=>setState('Doctor')} className='text-primary cursor-pointer'>Doctor</span></p>
      :
      <p className='text-sm'>Login as <span onClick={()=>setState('Admin')} className='text-primary cursor-pointer'>Admin</span></p>
      }
      </div>
    </form>
    
  )
}

export default Login;