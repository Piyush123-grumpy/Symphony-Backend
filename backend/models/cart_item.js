import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    products: [
        {
            name: { type: String, required: true },
            qty: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: String, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
        },
    ],
})

const cartItem = mongoose.model('cartItem', cartItemSchema)

export default cartItem