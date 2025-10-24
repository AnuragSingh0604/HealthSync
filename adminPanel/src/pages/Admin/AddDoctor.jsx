import React from 'react'
import { assets } from '../../assets/assets_admin/assets';

const AddDoctor = () => {
  return (
   <form className='m-5 w-full'>
    <p className='mb-3 text-lg font-medium'>Add Doctor</p>
    <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor='doc-img'>
                <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_icon} alt=""></img>

            </label>
            <input id='doc-img' type='file' className='hidden'></input>
            <p>Upload doctor <br></br> picture</p>
        </div>
        <div>
            <div>
                <div>
                    <p>Doctor name</p>
                    <input type='text' placeholder='Enter full name' required></input>
                </div>
                <div>
                    <p>Doctor Email</p>
                    <input type='text' placeholder='Email' required></input>
                </div>
                <div>
                    <p>Doctor password</p>
                    <input type='password' placeholder='Password' required></input>
                </div>
                <div>
                    <p>Experience</p>
                    <select name="" id="">
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
                <div>
                    <p>Fees</p>
                    <input type='number' placeholder='fees' required></input>
                </div>
            </div>
            <div>
                <div>
                    <p>Speciality</p>
                    <select name="" id="">
                        <option value="General physician">General physician</option>
                         <option value="Dermatologist">Dermatologist</option>
                          <option value="Neurologist">Neurologist</option>
                           <option value="Pediatrician">Pediatrician</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                                <option value="Gynecologist">Gynecologist</option> 

                    </select>

                </div>
                <div>
                    <p>Education</p>
                    <input type='text' placeholder='Education' required></input>
                </div>
                <div>
                    <p>Address</p>
                    <input type='text' placeholder='Address 1' required></input>
                    <input type='text' placeholder='Address 2' required></input>
                </div>
            </div>

        </div>
        <div>
                    <p>About Doctor</p>
                    <input type='text-area' placeholder='write about doctor' row={5} required></input>
                </div>
        <button type='submit'>Add Doctor</button>
    </div>

   </form>
  )
}

export default AddDoctor;