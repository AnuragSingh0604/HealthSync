import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,default:""},
    address:{type:Object,default:{line1:"",line2:"",}},
    gender:{type:String,default:"Not Specified"},
    dob:{type:String,default:"Not Specified"},
    phone:{type:String,default:"Not Specified"},
    
});

const UserModel=mongoose.model('User',userSchema);
export default UserModel;