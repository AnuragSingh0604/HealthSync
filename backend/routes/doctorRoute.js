import express from 'express';
import authDoctor from '../middleware/authDoctor.js';

import {  getDoctorList,loginDoctor,appointmentsByDoctor,appointmentCancelled,appointmentCompleted,doctordashboard,doctorProfile,updateDoctorProfile } from '../controllers/doctorController.js';


const doctorRouter = express.Router();
doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.post('/appointments-by-doctor', authDoctor,appointmentsByDoctor);
doctorRouter.post('/appointment-completed', authDoctor,appointmentCompleted);
doctorRouter.post('/appointment-cancelled', authDoctor,appointmentCancelled);
doctorRouter.post('/dashboard', authDoctor,doctordashboard);
doctorRouter.post('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);
export default doctorRouter;