import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Banner = () => {
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
           <p>Book Appointment</p>
           <p>With 100+ Trusted Doctors</p>
      </div>
       <button>Create account</button>
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className="w-full absolute bottom-0 right-0 max-w-md" src={assets.appointment_img} alt=""/>
        </div>

    </div>
  )
}

export default Banner