import React, { useState } from 'react'
import { assets } from '../../assets/assets_admin/assets.js';
import { useContext } from 'react';
import {toast} from "react-toastify";
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext.jsx';

const AddDoctor = () => {
    const [docImg,setDocImg]=useState(false);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [experience,setExperience]=useState('1 Year');
    const [fees,setFees]=useState('');
    const [speciality,setSpeciality]=useState('General physician');
    const [degree,setDegree]=useState('');
    const [address1,setAddress1]=useState('');
    const [address2,setAddress2]=useState('');
    const [about,setAbout]=useState('');
    const {backendUrl,aToken}=useContext(AdminContext);
   const  onSubmitHandler=async (e)=>{
  e.preventDefault();
  try{
    if(!docImg){
        toast.error("Please upload doctor image");
        return;
    }
    const formData=new FormData();
    formData.append('image',docImg);
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('experience',experience);
    formData.append('fees',fees);
    formData.append('speciality',speciality);
    formData.append('degree',degree);
    formData.append('address',JSON.stringify({address1,address2}));
    
    formData.append('about',about);
    formData.forEach((value,key)=>{
        console.log(key,value);
    })
    console.log(backendUrl);
    const {data}=await axios.post(`${backendUrl}/admin/add-doctor`,formData,{
        headers:{
           Authorization: `Bearer ${aToken}`,
            'Content-Type':'multipart/form-data'
        }
    });
    if(data.success){
        toast.success("Doctor added successfully");
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setSpeciality('General physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
        setAbout('');
    }
    else{
        toast.error(data.message);
    }
  }
  catch(err){
    console.log(err.message);
    toast.error(err.message);
  }
    }
  return (
   <form onSubmit={onSubmitHandler} className='m-5 w-full'>
    <p className='mb-3 text-lg font-medium'>Add Doctor</p>
    <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor='doc-img'>
                <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt=""></img>

            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])} id='doc-img' type='file' className='hidden'></input>
            <p>Upload doctor <br></br> picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10'text-gray-600>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor name</p>
                    <input onChange={(e)=>setName(e.target.value)} value={name} className="border rounded px-3 py-2" type='text' placeholder='Enter full name' required></input>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Email</p>
                    <input  onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type='text' placeholder='Email' required></input>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor password</p>
                    <input  onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-2" type='password' placeholder='Password' required></input>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Experience</p>
                    <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2" name="" >
                        <option value="1 Year">1 Year</option>
                         <option value="2 Year">2 Year</option>
                          <option value="3 Year">3 Year</option>
                           <option value="4 Year">4 Year</option>
                            <option value="5 Year">5 Year</option>
                             <option value="6 Year">6 Year</option>
                              <option value="7 Year">7 Year</option>
                               <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                 <option value="10 Year">10 Year</option>
                    </select>
                   
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Fees</p>
                    <input onChange={(e)=>setFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type='number' placeholder='fees' required></input>
                </div>
            </div>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Speciality</p>
                    <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2" name="" >
                        <option value="General physician">General physician</option>
                         <option value="Dermatologist">Dermatologist</option>
                          <option value="Neurologist">Neurologist</option>
                           <option value="Pediatrician">Pediatrician</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                                <option value="Gynecologist">Gynecologist</option> 

                    </select>

                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Education</p>
                    <input onChange={(e)=>setDegree(e.target.value)} value={degree} className="border rounded px-3 py-2" type='text' placeholder='Education' required></input>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Address</p>
                    <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2" type='text' placeholder='Address 1' required></input>
                    <input onChange={(e)=>setAddress2(e.target.value)}  value={address2}  className="border rounded px-3 py-2"
                    type='text' placeholder='Address 2' required></input>
                </div>
            </div>

        </div>
        <div >
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea onChange={(e)=>setAbout(e.target.value)}  value={about} className="w-full px-4 pt-2 border rounded" type='text-area' placeholder='write about doctor' row={5} required></textarea>
                </div>
        <button className="bg-primary px-10 py-3 mt-4 text-white rounded-full" type='submit'>Add Doctor</button>
    </div>

   </form>
  )
}

export default AddDoctor;