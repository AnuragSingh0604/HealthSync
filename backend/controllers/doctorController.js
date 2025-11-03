import Doctor from "../models/doctorModel.js";
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

export {changeAvailability,getDoctorList};