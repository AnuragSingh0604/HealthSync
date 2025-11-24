import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'


const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu,setShowMenu] = useState(false);
  const {token,setToken,userdata} = useContext(AppContext);
  const logout=()=>{
    setToken(false);
    localStorage.removeItem('token');
  }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
     
      <h1 className="w-44 cursor-pointer" style={{
  fontFamily: 'Inter, sans-serif',
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#5f6fff',
  marginLeft: '10px'
}}>
  HealthSync
</h1>
      
      <ul className='hidden md:flex items-center gap-5 font-medium'>
        <li className='py-1'>
          <NavLink to="/" className="flex flex-col items-center">
            HOME
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden'/>
          </NavLink>
        </li>
        <li className='py-1'>
          <NavLink to="/doctors" className="flex flex-col items-center">
            ALL DOCTORS
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden'/>
          </NavLink>
        </li>
        <li className='py-1'>
          <NavLink to="/about" className="flex flex-col items-center">
            ABOUT
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto  hidden'/>
          </NavLink>
        </li>
        <li className='py-1'>
          <NavLink to="/contact" className="flex flex-col items-center">
            CONTACT
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto  hidden'/>
          </NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>
        {token && userdata ? <div className="flex items-center gap-2 cursor-pointer group relative">
          <img  className='w-8 rounded-full' src={userdata.image}/>
          <img className='w-2.5' src={assets.dropdown_icon}/>
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
              <p onClick={()=>navigate('my-profile')}className='hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={()=>navigate('my-appointment')} className='hover:text-black cursor-pointer'>My Appointments</p>
              <p onClick={logout}className='hover:text-black cursor-pointer'>Logout</p>
            </div>
            </div>
        </div>:
        <button onClick={()=>navigate('/login')} className='  bg-[#5f6fff] text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>}
      
      <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon}></img>
      <div className={`${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
        <div className='flex itmes-center justify-between px-5 py-6'>
          <img className="w-36" src={assets.logo} alt=""></img>
          <img className="w-7" onClick={()=>setShowMenu(false)} src={assets.cross_icon} ßalt=""></img>
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
          <NavLink   onClick={()=>setShowMenu(false)} to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
          <NavLink  onClick={()=>setShowMenu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
          <NavLink  onClick={()=>setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
          <NavLink  onClick={()=>setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
        </ul>
      </div>
      </div>
    </div>
  )
}

export default Navbar
