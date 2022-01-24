const express=require("express");
require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const orderRoute=require('./routes/order');
const loginRoute=require('./routes/login');
const regRoute=require('./routes/register');
const users=require("./models/user");
var jwt = require('jsonwebtoken');
const secret="LaundryServices";

const app= express(); 

app.use("/api/v1/orders",async (req,res,next)=>{
    try {
    const token= req.headers.authorization.split("test ")[1];
    if (!token){
        return res.json({
            status:"failed",
            message:"Invalid Authorization"
        })
    }
    var decoded = jwt.verify(token, secret);
    req.user=decoded.data;
    } catch(err){
        res.json({
            status:"failed",
            message:err.message
        })
    }
    next();
})

app.use("/api/v1/register",regRoute)
app.use("/api/v1/login",loginRoute)
app.use("/api/v1/orders",orderRoute)

app.listen(5000);