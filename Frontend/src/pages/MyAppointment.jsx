import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import axios from 'axios';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom"


const MyAppointment = () => {
  const {backendUrl,token,getAllDoctors}=useContext(AppContext);
  const [loading,setLoading]=React.useState(false);

  const [appointments,setAppointments]=React.useState([]);
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 
  const formatDate=(dateStr)=>{
    const dateArray=dateStr.split("-");
    return dateArray[0]+" "+months[parseInt(dateArray[1])-1]+" "+dateArray[2];
  }
   const navigate=useNavigate();
  const getMyAppointments=async()=>{
    try{
      setLoading(true);
      const {data}=await axios.post(`${backendUrl}/user/my-appointments`,{},{
        headers:{
          authorization:`Bearer ${token}`,
        },
      });
      console.log("Appointments data:", data);
      if(data  && data.success){
        setAppointments(data.appointments);
      }
      else{
        toast.error(data.message);
      }
     
      return;
    }catch(error){
      toast.error("Error fetching appointments:", error.message);
    }
    finally{
      setLoading(false);
    }
  };
  const cancelAppointment=async(appointmentId)=>{
    try{
      setLoading(true);
      const {data}=await axios.post(`${backendUrl}/user/cancel-appointment`,{appointmentId},{
        headers:{   authorization:`Bearer ${token}`,  },
      });
      if(data && data.success){
        toast.success(data.message);
        await getMyAppointments();
       await  getAllDoctors();
      }
      else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error("Error cancelling appointment:", error.message);
    }
    finally{
      setLoading(false);
    }
  }
  const appointmentRazorpayPayment=async(appointmentId)=>{
    try{
      setLoading(true);
      const {data}=await axios.post(`${backendUrl}/user/razorpay-payment`,{appointmentId},{
        headers:{   authorization:`Bearer ${token}`,  },
      });
      if(data && data.success){
        initPay(data.order);
       
      }
      else{
        toast.error(data.message);
      } 
  }
    catch(error){
      toast.error("Error in payment:", error.message);
    }
    finally{
      setLoading(false);
    }
  };
  const initPay=(order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: "HealthSync",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async function (response) {
        try{
          const {data}=await axios.post(`${backendUrl}/user/verify-payment`,response,{
        headers:{   authorization:`Bearer ${token}`,  },
      });
        if(data && data.success){
          toast.success(data.message);
          await getMyAppointments();
          await getAllDoctors();  
        }
        else{
          toast.error(data.message);
        } 
        }
        catch(error){
             toast.error(error.message)
        }
        
      }

  }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}
  React.useEffect(()=>{
    if(token)
    getMyAppointments();
  },[token]);
  if(loading){
    return <div className='p-6'>
      <h1 className='text-2xl text-gray-700 font-medium'>Loading...</h1>
    </div>
  }
  else
  {
  return (appointments.length >0 ? 
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {appointments.slice(0,2).map((item,index)=>( 
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
          <div>
            <img className="w-32 bg-indigo-50" src={item.doctorData.image} alt=""/>
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.doctorData.name}</p>
            <p>{item.doctorData.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{item.doctorData.address.line1}</p>
            <p className='text-xs'>{item.doctorData.address.line2}</p>
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium '>Date & Time:</span> {formatDate(item.slotDate)}| {item.slotTime}</p>
          </div> 
          <div></div>
          <div className='flex flex-col gap-2 justify-end'>
             {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-100'>Paid</button>}
           
            {  !item.cancelled &&  !item.payment && <button onClick={()=>appointmentRazorpayPayment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 px-1 border rounded  hover:bg-primary hover:text-white transition-all duration-300' >Pay Online</button>}
            { !item.cancelled &&  <button className='px-1 text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300' onClick={() => cancelAppointment(item._id)
}>Cancel appointment</button>}
            { item.cancelled && <p className='text-red-600 font-medium sm:min-w-48 py-2 border border-red-500 rounded text-red-500 text-center'>Appointment cancelled</p>}
            
          </div>
          </div>


        ))}
      </div>
    </div>
    :
    <div className='p-6'>
      <h1 className='text-2xl text-gray-700 font-medium'>No appointments found</h1>
    </div>
  )}
}

export default MyAppointment