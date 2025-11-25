import React, {  useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useContext,useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import {toast} from "react-toastify";

  

const Appointment = () => {
  const {docId}=useParams();
  const daysOfweek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const navigate=useNavigate();
  const {doctors,currencySymbol,backendUrl,token,getAllDoctors}=useContext(AppContext);
  const [docInfo,setDocInfo]=useState(null);
  const [docSlots,setDocslots]=useState([]);
  const [slotIndex,setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState("");
  const fetchDocInfo=async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId);
    setDocInfo(docInfo);
  }
  const getAvailableSlots=async()=>{
    let allSlots = [];
    let today=new Date();
    for(let i=0;i<7;i++){
      let currentdate=new Date(today);
      currentdate.setDate(today.getDate()+i);
      let endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(21,0,0,0);
      if(today.getDate() === currentdate.getDate()){
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();

    if(hours < 10){
        hours = 10;
        minutes = 0;
    } else if(minutes < 30){
        minutes = 30; // round up to next half hour
        hours = hours;
    } else {
        minutes = 0;
        hours = hours + 1; // round up to next full hour
    }

    currentdate.setHours(hours);
    currentdate.setMinutes(minutes);
}

      else{
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }
      let timeslots=[];
      while(currentdate<endTime){
        let formattedTime=currentdate.toLocaleTimeString([],{hour:'2-digit',minute: '2-digit',
  hour12: true, });
  let day=currentdate.getDate();
  let month=currentdate.getMonth()+1;
  let year=currentdate.getFullYear();
  const slotDate=day+"-"+month+"-"+year;
  const slotTime=formattedTime;
  const isSlotAvailable=docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)? false:true ;
  if(isSlotAvailable) 
  {
 timeslots.push({datetime:new Date(currentdate),time:formattedTime});
  }


   
     
 currentdate.setMinutes(currentdate.getMinutes()+30);
    }
    allSlots.push(timeslots);
    }
    setDocslots(allSlots);
  }
  const bookAppointment=async()=>{
    if(!token){
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }
    try{
      const date=docSlots[slotIndex][0].datetime;
      let day=date.getDate();
      let month=date.getMonth()+1;
      let year=date.getFullYear();
      const slotDate=day+"-"+month+"-"+year;
      const {data}=await axios.post(`${backendUrl}/user/book-appointment`,{
        doctorId:docId,
        slotTime:slotTime,
        slotDate:slotDate,
      },{
        headers:{
          authorization:`Bearer ${token}`,
        },
      });
      if(data.success){
       toast.success("Appointment booked successfully"); 
       getAllDoctors();
       navigate("/my-appointment");
      }  
    else{
      toast.error(data.message);
    }  
  }
    catch(error){
      toast.error("Error fetching doctors:", error.message);
    }

}
  useEffect(()=>{
    fetchDocInfo();
  },[doctors,docId]);
  useEffect(()=>{
    getAvailableSlots();
  },[docInfo]);

    return docInfo && (
    <div >
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt=""/>
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className="w-5" src={assets.verified_icon}></img></p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree}-{docInfo.speciality}</p>
          < button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
        </div>
        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt=""></img></p>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>Appointment fee:<span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 '>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':'border border-gray-200'}`}key={index}>
                <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>

              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item,index)=>(<p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>))
          }
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>

     
      </div>
     
 <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment