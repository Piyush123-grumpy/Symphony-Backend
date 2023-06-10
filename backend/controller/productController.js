import Product from "../models/productModel.js"

export const getProduct=(req,res,next)=>{
    Product.find()
    .then(product=>{
        return res.json(product)})
    .catch(next)
}

export const getProductId=(req,res,next)=>{
    Product.findById(req.params.id)
    .then(product=>res.json(product))
    .catch(next)
}