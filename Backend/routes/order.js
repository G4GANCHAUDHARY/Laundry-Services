const express=require('express');
const router=express.Router();
const order=require('../models/order');
const bodyParser=require('body-parser');
const {body, validationResult}=require('express-validator');
const orders = require('../models/order');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get('/',async (req,res)=>{
    try {
        // console.log(req.body);
        const orderData= await order.find({user : req.user});
        res.json({
            status : "Success",
            data : orderData
        })
    } catch(err) {
        res.json({
            status : "Failed to get orders",
            message : err.message
        })
    }
})

router.post('/',
body("user").isMongoId(),
body("orderTime").isDate(),
body("productlist"),
body("totalprice"),
body("totalitems"),
body("status"),
async (req,res)=>{
    try {
        const orderData= await order.create({
            user : req.body.user,
            orderTime : req.body.orderTime,
            productlist : req.body.productlist,
            totalprice : req.body.totalprice,
            totalitems : req.body.totalitems,
            status : req.body.status
        });
        res.json({
            status : "Success",
            data : orderData
        })
    } catch(err) {
        res.json({
            status : "Failed to create order",
            message : err.message
        })
    }
})

router.put('/',body("_id").isMongoId(),async (req,res)=>{
    try{
        const order= await orders.findByIdAndUpdate({_id: req.body._id},req.body)
        res.json({
            status : "Updated Successfully",
            data : order
        })
    } catch {
        res.json({
            status : "Failed to update order",
            message : err.message
        })
    }
})

module.exports=router;