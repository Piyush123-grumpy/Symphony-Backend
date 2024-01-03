import e from "express";
import cartItem from "../models/cart_item.js"
import asyncHandler from 'express-async-handler'


export const addCartItems = asyncHandler(async (req, res) => {
    const {
        product,
    } = req.body;

    console.log(req.body)

    const userId = req.user._id;

    try {


        let cart = await cartItem.findOne({ user: userId });

        if (cart) {
            cart.products.push(product[0]);
        } else {
            cart = new cartItem({
                user: userId,
                products: [...product],
            });
        }

        const updatedCart = await cart.save();
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Cart update failed' });
    }
});
// export const addCartItems = asyncHandler(async (req, res) => {
//     const {
//         product,
//         name,
//         image,
//         price,
//         countInStock,
//         qty,
//     } = req.body;

//     if (!product || product.length === 0) {
//         res.status(400);
//         throw new Error('No cart items');
//     }

//     const userId = req.user._id;

//     // Check if the user already has a cart
//     let cart = await cartItem.findOne({ user: userId });

//     if (cart) {
//         // User has a cart, update the products array
// cart.products.push({ product, qty,name,image,price,countInStock }); // Add the new product to the products array
//     } else {
//         // User doesn't have a cart, create a new cart
//         cart = new cartItem({
//             user: userId,
//             products: [{ product, qty ,name,image,price,countInStock}], // Create a new products array with the new product
//         });
//     }

//     const updatedCart = await cart.save();

//     res.status(201).json(updatedCart);
// });


export const removeProductFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Get the cart ID from the request parameters
    console.log(userId)
    const productToRemove = req.params.id;
    console.log(productToRemove)
    // Find the cart by ID and update it to remove the specified product
    // const updatedCart = await cartItem.findByIdAndUpdate(
    //     {user:userId},
    //     { $pull: { products: { product: productToRemove } } },
    //     { new: true } // Return the updated cart after the update
    // );

    cartItem.updateOne(
        { user: userId },
        { $pull: { products: { product: productToRemove } } },
        (err, result) => {
            if (err) {
                console.error('Error:', err);
                // Handle the error
            } else {
                console.log('Update Result:', result);
            }
        }
    );


});