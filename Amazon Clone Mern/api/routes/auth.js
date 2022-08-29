const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register",async(req,res)=>{
    try {
        if(!req.body){
           return res.status(401).json(
            { 
                message:"Please Provide Username,Email and Password"
            });
        }
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY ).toString()
        });
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})
//LOGIN
router.post("/login",async(req,res)=>{
    try {
         const user =await User.findOne({
            username:req.body.username
         });

         if(!user){
            return res.status(401).json("Wrong User Name");
         } 
         
         const hashPassword  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
         const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

         const inputPassword = req.body.password ;

         if(originalPassword !== inputPassword){
            return  res.status(401).json("Wrong Password");
         }

         const accessToken = jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin
                },
                process.env.JWT_SECRET ,
                {expiresIn:"3d"}
            )

        const {password,...others} = user._doc
        res.status(200).json({...others,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router;