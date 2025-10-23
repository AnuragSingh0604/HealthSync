import React, { use ,useContext} from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './component/Navbar.jsx';
import Sidebar from './component/sidebar.jsx';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllApointments from './pages/Admin/AllApointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
const App = () => {
  const {aToken}=useContext(AdminContext);
  return  aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer ></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path="/adminDashboard" element={<Dashboard/>}></Route>
          <Route path="/allAppointments" element={<AllApointments/>}></Route>
          <Route path="/addDoctor" element={AddDoctor}></Route>
          <Route path="/doctorList" element={<AddDoctor></AddDoctor>}></Route>
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