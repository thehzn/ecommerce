const User =require("../models/userModel");   //User is a model containing userSchema
const bcrypt=require("bcrypt");
const { generateToken } = require("../utils/token");
exports.userRegister = async(req,res)=>{

    try{

const {fullname,email,password}=req.body;

if(!fullname || !email || !password){
    return res.status(400).json({
        message:"enter full details" ,
        success:false 
    });
}


  const user=await User.create(req.body);    //here creating a db doc of user  and add it to collection users,if not exist ,it creates automatically

         res.status(201).json({
        message:"user registered succussfully" ,
        success:true,
        user
    });
    }
    catch(error){
         return res.status(500).json({
            message: error.message,
            success:false,
        });
    }


    
   
}

exports.updateUser =async(req,res)=>{
     try{
  const {fullname ,email} = req.body;

  const userId = req?.userId;

  if(!fullname || !email ){
     return res.status(400).json({
        message:"enter full details" ,
        success:false 
  })}
  if(!userId){
     return res.status(404).json({
        message:"user not found",
        success:false
  })}
    const user = await User.findByIdAndUpdate(userId,req.body,{
        new:true,
        
    });

  


  res.status(201).json({
        message:"user profile updated succussfully" ,
        success:true,
        user
    });


     }
     catch(error){

         return res.status(500).json({
            message: error.message,
            success:false,
        });
     }
}

exports.userLogin = async(req,res)=>{
    try{
        console.log("login body",req.body);
        
        const {email ,password} =req.body;

        if(!email || !password){
            return res.status(400).json({
        message:"enter full details" ,
        success:false 
     })}

       const user = await User.findOne({email});

       if(!user){
         return res.status(404).json({
        message:"user not found" ,
        success:false 
     })}


     const isMatch = await bcrypt.compare(password,user.password);

     if(!isMatch){
         return res.status(401).json({
        message:"invalid credentials" ,
        success:false 
     })}


     const token = await generateToken(user._id,user.role);

     
     res.status(200).cookie('token',token).json({
       message:"user logged succussfully" ,
        success:true,
       user
     })
    }
     catch(error){

         return res.status(500).json({
            message: error.message,
            success:false,
        });
     }
}

exports.userLogout =(req,res)=>{
     res.status(200).clearCookie("token").json({
        message:"user logged out successfully",
        success:true,
    })
}

exports.getAllusers = async(req ,res) =>{
    try{
         const users = await User.find();
          res.status(200).json({
          success:true,
          users
    });
         
    }
    catch(error)
    {
            
         return res.status(500).json({
            message: error.message,
            success:false,
        });
    }
   

}

exports.updateUserStatus = async(req,res)=>{
    try {
       const {id} = req.params;
    if(!id){
        return res.status(400).json({
        message:"enter full details" ,
        success:false 
     })  
    }
    const user = await User.findById(id);
     if(!user){
         return res.status(404).json({
        message:"user not found" ,
        success:false 
     })}

     user.status = !user.status;
     await user.save();
     res.status(200).json({
       message:"user status changed" ,
        success:true,
       user
     })  
    } catch (error) {
          return res.status(500).json({
            message: error.message,
            success:false,
        });
    }
   
    

}