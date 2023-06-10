import mongoose from "mongoose";

const orderItem=mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Objectid,
        ref:'Product'
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const OrderItem=mongoose.model('OrderItem',orderItem)