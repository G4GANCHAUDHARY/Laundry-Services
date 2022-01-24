const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        min:1000000000,
        unique : true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const users=mongoose.model('Users',UserSchema)

module.exports=users;