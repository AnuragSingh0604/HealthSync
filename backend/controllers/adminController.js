import validator from 'validator';
import bcrypt from 'bcrypt';
import Doctor from '../models/doctorModel.js';
import {v2 as cloudinary} from 'cloudinary';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import DoctorModel from '../models/doctorModel.js';
import UserModel from '../models/userModel.js';


const addDoctor=async(req,res)=>{
    try{
        const {name,email,password,speciality,experience,degree,about,fees,address,}=req.body;
        const image=req.file;
        if(!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address ){
        
            return res.status(400).json({success:false,message:"all fields are required"})}
        if(!validator.isEmail(email)){    
            return res.status(400).json({success:false,message:"invalid email"});}
        if(password.length<8){
            return res.status(400).json({success:false,message:"password must be at least 8 characters long"});}
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            
            const uploadedImage=await cloudinary.uploader.upload(image.path,{resource_type  :'image'});
            const imageUrl=uploadedImage.secure_url;
            
            const newDoctor=new Doctor({
                name,
                email,
                password:hashedPassword,
                speciality,
                experience,
                degree,
                about,
                availability:true,
                fees,
                address:JSON.parse(address),
                date:Date.now(),
                image:imageUrl
            });
            await newDoctor.save();
            console.log("new doctor added:",newDoctor);
            res.status(201).json({success:true,message:"doctor added successfully"});
    }
    catch(error){
        console.error("Error in addDoctor:",error);
        res.status(500).json({success:false,message:error.message});
        
        }}
        const loginAdmin=async(req,res)=>{
            try{
                const {email,password}=req.body;
                if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
                     const token=jwt.sign(email+password,process.env.JWT_SECRET);
                    return res.status(200).json({success:true,message:"login successful",token});
                }
                else{
                    return res.status(401).json({success:false,message:"invalid credentials"});
                }

            }catch(error){
                console.error("Error in loginAdmin:",error);
                res.status(500).json({success:false,message:error.message});
            }

        }
        const allDoctors=async(req,res)=>{
            try{
                const doctors=await Doctor.find({}).select('-password');
                res.status(200).json({success:true,doctors});
            }catch(error){
                console.error("Error in allDoctors:",error);
                res.status(500).json({success:false,message:error.message});
            }
        }
const apponitments=async(req,res)=>{
    try{
        // Implementation for fetching appointments
        const appointments = await appointmentModel.find({});
       res.status(200).json({success:true,appointments});
    }catch(error){
        console.error("Error in appointments:",error);
        res.status(500).json({success:false,message:error.message});
    }
}
const appointmentCancel = async (req, res) => {     
                try {
                    const { appointmentId } = req.body;      

                    const appointment = await AppointmentModel.findById(appointmentId); 
                    
                    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true });
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
    const adminDashboard=async(req,res)=>{
        try{
            const doctors=await DoctorModel.countDocuments();
            const appointments=await appointmentModel.find({});
            const users=await UserModel.countDocuments();
            const dashboardData={doctors,appointments:appointments.length,patients:users,latestAppointments:appointments.slice(-5).reverse()};
            res.status(200).json({success:true,dashboardData});
            //
            
        }catch(error){
            console.error("Error in adminDashboard:",error);
            res.status(500).json({success:false,message:error.message});
        }
    }
    
    export {addDoctor,loginAdmin,allDoctors,apponitments,appointmentCancel,adminDashboard};