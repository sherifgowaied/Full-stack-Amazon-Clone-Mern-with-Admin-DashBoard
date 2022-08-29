const User = require("../models/User");
const { verfiyToken, verfiyTokenAndAuthorization } = require("./verfiyToken");
const {verfiyTokenAndAdmin} = require("./verfiyToken")
var CryptoJS = require("crypto-js");
const router = require("express").Router();

//UPDATE
router.put("/:id",verfiyTokenAndAuthorization, async (req,res)=>{
    if(req.body.password){
        req.password = CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY ).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(403).json(error);
    }
})
//DELETE
router.delete("/:id",verfiyTokenAndAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted sucessfully");
    }catch(err){
        res.status(403).json(err);
    }
})


//GET
router.get("/find/:id",verfiyTokenAndAdmin,async(req,res)=>{
     try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user ;
        res.status(200).json(user);
     }catch(error){
        res.status(403).json(error);
     }
})

//GET ALL

router.get("/",verfiyTokenAndAdmin,async(req,res)=>{
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find() ;
        res.status(200).json(users);

    } catch (error) {
        res.status(403).json(error);
    }
})


// GET USER STATS 
router.get("/stats",verfiyTokenAndAdmin,async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    
    try {
        const data =await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
              $project: {
                month: { $month: "$createdAt" },
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: 1 },
              },
            },
          ]);
          res.status(200).json(data)
    } catch (error) {
        res.status(403).json(error);
    }
})

module.exports = router;