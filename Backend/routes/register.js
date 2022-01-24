const express=require('express');
const router=express.Router();
const users=require('../models/user');
const bodyParser=require('body-parser');
const {body, validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const saltRounds=10;

router.post('/',
body("name"),
body("email").isEmail(),
body("mobile").isMobilePhone(),
body("state"),
body("district"),
body("address"),
body("pincode"),
body("password"),
async (req,res)=>{
    try{
        const errors=validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password,saltRounds, async (err,hash)=>{
            try{
                const user = await users.create({
                    name : req.body.name,
                    email : req.body.email,
                    mobile : req.body.mobile,
                    state : req.body.state,
                    district : req.body.district,
                    address : req.body.address,
                    pincode : req.body.pincode,
                    password : hash
                })
                res.json({
                    status:"Success",
                    user : user
                })
            } catch (err){
                res.json({
                    status:"Failed to register",
                    message:err.message
                })
            }
        })
    } catch(e){
        res.json({
            status:"Failed to register",
            message:e.message
        })
    }
})

module.exports=router;