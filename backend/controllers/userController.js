import UserModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary';
import DoctorModel from "../models/doctorModel.js";
import razorpay from 'razorpay';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }                                                   
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, );

        res.status(201).json({ success: true, message: "User registered successfully" , token: token  });
    }
    catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: error.message });
    }
        
    }
    const loginUser = async (req, res) => {
        try{
       
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: "Login successful", token: token }); 
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ success: false, message: error.message });
    };
}
const getProfile = async (req, res) => {
    try {
      const {userId}=req.body;

        const user = await UserModel.findById(userId).select('-password');
       
        
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user: user });
    } catch (error) {
        console.error("Error in finding user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateProfile = async (req, res) => {
    try {
        const { userId ,name,phone,address,dob,gender} = req.body;
        const imageFile=req.file;
        const updateData={};
        if(name) updateData.name=name;
        if(phone) updateData.phone=phone;
        if (address) {
      try {
        updateData.address = JSON.parse(address);
      } catch (e) {
        console.log("Address JSON parse error:", e);
      }
    }
        if(dob) updateData.dob=dob;
       
        if(gender) updateData.gender=gender;
        await UserModel.findByIdAndUpdate(userId,updateData);
        if(imageFile){
            const imagePath=await cloudinary.Uploader.upload(imageFile.path,{resource_type:'image'});
            const imageUrl=imagePath.secure_url;
            await UserModel.findByIdAndUpdate(userId,{image:imageUrl});
        }
        res.status(200).json({success:true,message:"Profile updated successfully"});
    } catch (error) {
        console.error("Error in updating profile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const bookAppointment = async (req, res) => {
    try {
       
        const { userId, doctorId, slotTime,slotDate} = req.body;
        const doctorData = await DoctorModel.findById(doctorId).select('-password');
        if (!doctorData.availability) { 
            return res.status(400).json({ success: false, message: "Doctor is not available for appointments" });
        }
      
       
        let slots_booked = doctorData.slots_booked || {};
        if (slots_booked[slotDate]  ) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ success: false, message: "Selected slot is already booked" });
            }
            else {
                slots_booked[slotDate].push(slotTime);
            }
        }
        else {
            slots_booked[slotDate]=[];
            slots_booked[slotDate].push(slotTime);
        }
        const userData = await UserModel.findById(userId).select('-password');
        delete doctorData.slots_booked;
        const newAppointment = new AppointmentModel({
            userId,
            doctorId,
            slotTime,
            slotDate,
            userData,
            doctorData,
            amount: doctorData.fees,
            date: Date.now(),
        });
        await newAppointment.save();
        await DoctorModel.findByIdAndUpdate(doctorId, { slots_booked: slots_booked });
        res.status(201).json({ success: true, message: "Appointment booked successfully" });

    
    } catch (error) {
        console.error("Error in booking appointment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

            const listAppointments = async (req, res) => {
               
                try {
                   
                    const { userId } = req.body;
                    const appointments = await AppointmentModel.find({ userId }).sort({ date: -1 });
                   
                    res.status(200).json({ success: true, appointments: appointments });

                } catch (error) {
                    console.error("Error in listing appointments:", error);     
                    res.json({ success: false, message: error.message });
                }
            };
            const cancelAppointment = async (req, res) => {     
                try {
                    const { appointmentId ,userId} = req.body;      

                    const appointment = await AppointmentModel.findById(appointmentId); 
                    if (appointment.userId !== userId) {
                        return res.status(404).json({ success: false, message: "Appointment not found" });
                    }
                    await AppointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true });
                    const {doctorId,slotDate,slotTime}=appointment;
                    const doctorData = await DoctorModel.findById(doctorId).select('-password');
                    let slots_booked = doctorData.slots_booked || {};
                    if (slots_booked[slotDate]) {
                        slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
                        await DoctorModel.findByIdAndUpdate(doctorId, { slots_booked: slots_booked });
                    }
                    res.status(200).json({ success: true, message: "Appointment cancelled successfully" });

                } catch (error) {
                    console.error("Error in cancelling appointment:", error);
                    res.status(500).json({ success: false, message: error.message });
                }
            }
    const razorpayInstance=new razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET,
      });
      const razorpayPayment=async(req,res)=>{
           const {appointmentId}=req.body;
           try{
            const appointmentData=await AppointmentModel.findById(appointmentId);
            
            if(!appointmentData || appointmentData.cancelled){
                return res.status(404).json({success:false,message:"Appointment not found"});
            }
            //creating option object for razorpay order
            const options={
                amount: appointmentData.amount * 100
,
                currency:process.env.CURRENCY,
                receipt: `ro_${appointmentId}`,

                payment_capture:1,
            };
            const order=await razorpayInstance.orders.create(options);
            res.status(200).json({success:true,order:order});
           }
              catch(error){   
            console.error("Error in creating razorpay order:", error);
            res.status(500).json({ success: false, message: error.message });  
              }
      };
      const verifyPayment=async(req,res)=>{
        try{
             const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
             const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id);
             console.log("Order Info:", orderInfo);

             if(orderInfo.status==="paid"){
                const receipt = orderInfo.receipt;  
              const appointmentId = receipt.split("_")[1];

                await AppointmentModel.findByIdAndUpdate(appointmentId,{payment:true});
                return res.status(200).json({success:true,message:"Payment Successful and appointment confirmed"});
             }
             else{
                return res.status(400).json({success:false,message:"Payment failed"});
             }
        }catch(error){
            console.error("Error in verifying payment:", error);
            res.status(500).json({ success: false, message: error.message });   
       
            }
       
        
      }


    export { registerUser , loginUser , getProfile , updateProfile,bookAppointment, listAppointments, cancelAppointment,razorpayPayment,verifyPayment};
    
