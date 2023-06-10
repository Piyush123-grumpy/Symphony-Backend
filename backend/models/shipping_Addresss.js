import mongoose from "mongoose";

const shippingAddress=mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    postal_code:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    }
})

const ShippingAddress=mongoose.model('ShippingAddress',shippingAddress)