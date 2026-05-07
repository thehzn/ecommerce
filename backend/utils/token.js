const jwt=require("jsonwebtoken");

exports.generateToken = async (userId ,userRole ="user")=>{
    try{
        const payload = {
            userId,
            userRole
        };
        const token = await jwt.sign(
            payload ,
            process.env.TOKEN_SECRET_KEY ,
            {expiresIn:"5d"});

        return token;
    }
    catch(error){
        throw new Error(error.message);
    }
}

exports.verifyToken =async (token)=>{
    try{
        const decode =await jwt.verify(token,process.env.TOKEN_SECRET_KEY);
        return decode;
    }
    catch(error){
         throw new Error(error.message);
    }
}