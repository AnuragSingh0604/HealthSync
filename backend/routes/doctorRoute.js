import express from 'express';
import authDoctor from '../middleware/authDoctor.js';

import {  getDoctorList,loginDoctor,appointmentsByDoctor,appointmentCancelled,appointmentCompleted } from '../controllers/doctorController.js';


const doctorRouter = express.Router();
doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.post('/appointments-by-doctor', authDoctor,appointmentsByDoctor);
doctorRouter.post('/appointment-completed', authDoctor,appointmentCompleted);
doctorRouter.post('/appointment-cancelled', authDoctor,appointmentCancelled);
export default doctorRouter;