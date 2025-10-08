import React, { useContext,useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {
    const {doctors}=useContext(AppContext);
    const [relDoc,setRelDocs]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(doctors.length >0 && speciality){const doctorsData=doctors.filter((doc)=>doc.speciality===speciality && doc._id !== docId);setRelDocs(doctorsData)}},[doctors,speciality,docId])
  
            return (
                <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-2xl font-medium">Related Doctors</h1>
   <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {relDoc.slice(0,5).map((item,index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" key={index}>
                    <img className="bg-blue-50  w-full  object-cover" src={item.image}></img>
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-gren-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
       </div>
  )
}

export default RelatedDoctors