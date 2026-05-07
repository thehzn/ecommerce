const { verifyToken } = require("../utils/token");

exports.userAuthenticate = async(req,res,next)=>{
    try{
    const {token} =req.cookies;
    if(!token){
         return res.status(401).json({
        message:"unautherised user" ,
        success:false  
    })
    }
    const decode = await verifyToken(token);
    req.userId = decode?.userId;
    req.userRole = decode?.userRole;

    next();
    
    
}
catch(error){
     return res.status(500).clearCookie("token").json({
            message: error.message,
            success:false,
        });
}
}

exports.userAutherize =(...permittedroles)=>{    // permittedroles is an array containing roles those who can access the route

    return(req,res,next)=>{
        console.log("Checking Role:", req.userRole); // Is this 'admin'?
    console.log("Allowed Roles:", permittedroles);
        if(!permittedroles.includes(req?.userRole)){
              return res.status(403).json({
        message:"access denied" ,
        success:false  
    })
        }

        next();
    }
}