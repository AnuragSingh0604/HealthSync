import validator from 'validator';
import bcrypt from 'bcrypt';
import Doctor from '../models/doctorModel.js';
import {v2 as cloudinary} from 'cloudinary';

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
                     const token=jwt.sign(email+password,process.env.JWT_SECRET,{expiresIn:'2h'});
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


    export {addDoctor,loginAdmin};