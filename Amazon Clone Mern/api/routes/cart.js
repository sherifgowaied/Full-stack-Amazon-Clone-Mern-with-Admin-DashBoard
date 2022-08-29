const router = require("express").Router()
const {verfiyToken,verfiyTokenAndAuthorization,verfiyTokenAndAdmin} = require("./verfiyToken")
const Cart = require("../models/Cart");

//CREATE CART
router.post("/",verfiyToken,async(req,res)=>{
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
         res.status(200).json(savedCart)
    } catch (error) {
         res.status(500).json(error)
    }
})



//UPDATE CART
router.put("/:cartId",verfiyTokenAndAuthorization,async(req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.cartId,{
            $set:req.body
        },
        {new:true}
        )
        
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE CART
router.delete("/:cartId",verfiyTokenAndAuthorization,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.cartId);
        res.status(200).json("Your Cart has Been Deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
})


//GET USER CART
router.get("/find/:userId",verfiyTokenAndAuthorization,async(req,res)=>{
    try {
        const userCart =await Cart.findOne({userId:req.params.userId});
        res.status(200).json(userCart)
    } catch (error) {
        res.status(500).json(error)
    }
})


//GET ALL CARTS
router.get("/",verfiyTokenAndAdmin,async(req,res)=>{
    try {
        const carts =await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router;

