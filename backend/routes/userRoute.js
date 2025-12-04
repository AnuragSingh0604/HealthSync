import express from 'express';
import { registerUser,loginUser ,getProfile,updateProfile,bookAppointment,listAppointments,cancelAppointment ,razorpayPayment,verifyPayment} from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from "../middleware/multer.js";
const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/profile',authUser, getProfile);
userRouter.put('/profile',authUser,upload.single('image'), updateProfile);
userRouter.post('/book-appointment',authUser, bookAppointment);
userRouter.post('/my-appointments',authUser, listAppointments);
userRouter.post('/cancel-appointment',authUser, cancelAppointment);
userRouter.post('/razorpay-payment',authUser, razorpayPayment);
userRouter.post('/verify-payment',authUser, verifyPayment);
export default userRouter;

