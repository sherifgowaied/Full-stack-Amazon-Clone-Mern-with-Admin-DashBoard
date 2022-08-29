const { verfiyToken, verfiyTokenAndAuthorization } = require("./verfiyToken");
const {verfiyTokenAndAdmin} = require("./verfiyToken")
const Product = require("../models/Product");
const router = require("express").Router();

//CREATE
router.post("/",verfiyTokenAndAdmin,async(req,res)=>{
    try {
        const newProduct = new Product(req.body);

        const product = await newProduct.save()

        res.status(200).json(product)
    } catch (error) {
        res.status(403).json(error)
    }
})

// UPDATE
router.put("/:id",verfiyTokenAndAdmin,async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        

        res.status(200).json(product)
    } catch (error) {
        res.status(403).json(error)
    }
})


// DELETE 
router.delete("/:id",verfiyTokenAndAdmin,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        
        res.status(200).json("The product has been deleted sucessfully" )
    } catch (error) {
        res.status(403).json(error)
    }
})
// GET 
router.get("/find/:id",async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json(product)
    } catch (error) {
        res.status(403).json(error)
    }
})
//GET ALL
router.get("/",async(req,res)=>{
    const newQuery = req.query.new ;
    const categoryQuery = req.query.category ;
    let products = [] ;
    try {
        if(newQuery){
             products = await Product.find().sort({createdAt:-1}).limit(1);
            // products.push(newProducts)
        }else if(categoryQuery){
             products = await Product.find({
                categories:{
                    $in:[categoryQuery]
                }
            })
        }else{
             products = await Product.find();
        }
        

        res.status(200).json(products)
    } catch (error) {
        res.status(403).json(error)
    }
})


module.exports = router;