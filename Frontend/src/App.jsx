import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Footer from './components/Footer'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer position='top-center'/>
      <Navbar></Navbar>
      {/* Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors/>}></Route>
        <Route path='doctors/:speciality' element={<Doctors/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/my-profile' element={<MyProfile></MyProfile>}></Route>
        <Route path='/my-appointment' element={<MyAppointment></MyAppointment>}></Route>
        <Route path='/appointment/:docId' element={<Appointment></Appointment>}></Route>
        <Route path='*' element={<div className='text-3xl font-bold text-center mt-20'>404 Not Found</div>}></Route>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App