import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const changeAvailability=async(req,res)=>{
    try{
        const doctorId=req.body.doctorId;
        const docData=await Doctor.findById(doctorId);
        await Doctor.findByIdAndUpdate(doctorId,{availability:!docData.availability});
        res.status(200).json({success:true,message:"availability changed successfully"});
    }catch(error){
        console.error("Error in changeAvailability:",error);
        res.status(500).json({success:false,message:error.message});
    }
} 
const getDoctorList=async(req,res)=>{
    try{
                const doctors=await Doctor.find({}).select('-password');
                
                res.status(200).json({success:true,doctors});
            }catch(error){
                console.error("Error in allDoctors:",error);
                res.status(500).json({success:false,message:error.message});
            }
  }
  const loginDoctor=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const doctor=await Doctor.findOne({email});
        if(!doctor){
            return res.status(200).json({success:false,message:"Doctor not found"});
        }
        const isMatch=await bcrypt.compare(password,doctor.password);
        if(!isMatch){
            return res.status(200).json({success:false,message:"Invalid Credentials"});
        }
        if(isMatch){
            const token=jwt.sign({doctorId:doctor._id},process.env.JWT_SECRET);
            return res.status(200).json({success:true,message:"Login Successful",token});
        }
        
        
    }catch(error){
        console.error("Error in loginDoctor:",error);
        res.status(500).json({success:false,message:error.message});
    }
}       


export {changeAvailability,getDoctorList,loginDoctor};