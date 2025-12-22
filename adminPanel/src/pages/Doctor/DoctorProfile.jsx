import React, {  useState } from 'react'
import { useContext ,useEffect} from 'react';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorProfile = () => {
  const {dToken,profileData,setProfileData,getProfileData,updateProfile,}=useContext(DoctorContext);
  const [isEdit,setIsEdit]=useState(false);
  
  const updatedProfileData=async()=>{
    try{
      await updateProfile(profileData);
    }
    finally{ 
setIsEdit(false);
    }
   
    
  };
  useEffect(()=>{
    if(dToken){
      getProfileData();
    }
  },[dToken]);
  return profileData &&  (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt=""></img>
        </div>
        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white" >
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree}-{profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full' >{profileData.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800mt-3'>About:</p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
            
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment fee:<span className='text-gray-800'>$ {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}></input>:profileData.fees}</span></p>
          <div className='flexgap-2 py-2'>
            <p>Address:</p>
            <p className='text:sm'>{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,address1:e.target.value}}))} value={profileData.address.address1} /> : profileData.address.address1} <br></br> 
            {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,
address2:e.target.value}}))} value={profileData.address.
address2} /> : profileData.address.
address2}</p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input
  type="checkbox"
  checked={profileData.availability}
  disabled={!isEdit}
  onChange={(e) => {
    setProfileData(prev => ({
      ...prev,
      availability: e.target.checked
    }));
  }}
/>

            <label htmlFor=''>Available for appointments</label>
          </div>
          {isEdit ?  <button onClick={updatedProfileData} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>:<button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Update Profile</button>
}
          
        </div>
      </div>

    </div>
  )
}

export default DoctorProfile