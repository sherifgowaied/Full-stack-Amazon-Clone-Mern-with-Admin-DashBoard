
const router = require("express").Router()
const dotenv = require("dotenv")
dotenv.config()
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY)


router.post('/payment',(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:'usd',
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(403).json(stripeErr);
        }else{
            //console.log(stripeRes)
            res.status(200).json(stripeRes );
            
        }
    }
    )
})



module.exports = router;