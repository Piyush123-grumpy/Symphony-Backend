import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: { type: String, required: true }
},
    {
        timestamps: true
    })

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    numReview: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0

    },
    countInStock: {
        type: String,
        required: true
    },

})

const Product = mongoose.model('Product', productSchema)

export default Product

