import UserModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

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
        // Additional validation and user registration logic...
    }
    const loginUser = async (req, res) => {
        try{
        // User login logic...
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
        res.status(200).json({ success: true, data: user });
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
        if(address) updateData.address=address;
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
            


    export { registerUser , loginUser , getProfile , updateProfile};
