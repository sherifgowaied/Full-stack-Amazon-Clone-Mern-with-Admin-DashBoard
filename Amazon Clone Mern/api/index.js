const express = require("express");
const dotenv = require('dotenv');
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const stripeRoute =require("./routes/stripe")
const orderRoute =require("./routes/order")
const cors = require("cors")

dotenv.config();
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Db is connected sucessfully")
})
.catch((err)=>{
    console.log(err)
})


app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);
app.use('/api/checkout',stripeRoute)
app.use('/api/orders',orderRoute)





app.listen(process.env.PORT || 5000,()=>{
    console.log("app is listening on port 5000")
})


