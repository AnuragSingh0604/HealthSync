import React, { useContext} from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './component/Navbar.jsx';
import Sidebar from './component/sidebar.jsx';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllApointments from './pages/Admin/AllApointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx'; 

const App = () => {
  const {aToken}=useContext(AdminContext);
  const {dToken}=useContext(DoctorContext);
  return  aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer ></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar></Sidebar>
        <Routes>
        {/* Admin Route */}
          <Route path='/' element={<></>}></Route>
          <Route path="/adminDashboard" element={<Dashboard/>}></Route>
          <Route path="/allAppointments" element={<AllApointments/>}></Route>
          <Route path="/addDoctor" element={<AddDoctor></AddDoctor>}></Route>
          <Route path="/doctorList" element={<DoctorsList/>}></Route>
          {/* Doctor Route */}
          <Route path="/doctorDashboard" element={<DoctorDashboard/>}></Route>
          <Route path="/doctorProfile" element={<DoctorProfile/>}></Route>
          <Route path="/doctorAppointments" element={<DoctorAppointments/>}></Route>
        </Routes>
      </div>
      
    </div>):(
    <div >
     <Login></Login>
      <ToastContainer ></ToastContainer>
     </div>
  )
}

export default App