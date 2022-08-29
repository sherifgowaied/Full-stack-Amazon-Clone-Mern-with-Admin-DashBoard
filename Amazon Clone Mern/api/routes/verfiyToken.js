const jwt = require("jsonwebtoken");

const verfiyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return  res.status(403).json("You are not authenticated with token")
            }
            req.user = user;
            next();
        })

    }else{
        return res.status(403).json("You are not authenticated")
    }
    
}

const verfiyTokenAndAuthorization = (req,res,next)=>{
    verfiyToken(req,res,()=>{
        if(req.params.id === req.user.id  || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alllowed to do that !")
        }
    })
}

const verfiyTokenAndAdmin = (req,res,next)=>{
    verfiyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alllowed to do that need admin !")
        }
    })
}



module.exports = {verfiyToken,verfiyTokenAndAuthorization,verfiyTokenAndAdmin}; 