const express=require("express");
const router=express.Router();
const {body, validationResult}=require('express-validator');
const bodyParser=require('body-parser');
const users=require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret="LaundryServices";

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post("/",
body("password") ,
async (req,res)=>{
    try{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.email){
            var user= await users.findOne({email:req.body.email})
        } else {
            var user= await users.findOne({mobile:req.body.mobile})
        }
        bcrypt.compare(req.body.password, user.password, async function(err,hash){
            try {
                const token= jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);
                res.header("Authorization","test "+token)
                res.json({
                    status:"Token Stored",
                    content : token
                })
            } catch(err) {
                res.json({
                    status:"Invalid credentials",
                    message:err.message
                })
            }
        })
    } catch(e){
        res.json({
            status:"Failed to Login",
            message:e.message
        })
    }
})

module.exports=router; 