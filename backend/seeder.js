import mongoose, { connect } from "mongoose";
import users from "./data/users.js";
import products from "./data/product.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/order_details.js";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";

// const dotenv=require('dotenv')

dotenv.config()

await connectDB()


const importData=async()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers=await User.insertMany(users)
        const adminUser=createdUsers[0]._id

        const sampleProudcts=products.map(product=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProudcts)
        process.exit()
    }
    catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData=async()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        process.exit()
    }
    catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2]=='-d'){
    destroyData()
}else{
    importData()
}