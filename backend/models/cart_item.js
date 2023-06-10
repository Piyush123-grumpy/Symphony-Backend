import mongoose from "mongoose";

const cartItemSchema=mongoose.Schema({
    
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number

    }
})

const cartItem=mongoose.model('cartItem',cartItemSchema)
