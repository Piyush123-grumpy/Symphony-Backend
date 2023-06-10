import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generatedToken.js';

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors
}

export const signup_get = (req, res) => {
    console.log("Ss")
}
export const login_get = (req, res) => {
    res.render('login');
}


export const signup_post = async (req, res) => {
    const { name, email, password } = req.body




    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    console.log(req.body)
    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            token:generateToken(user._id),
            data: {
                _id: user._id,
                name: user.username,
                email: user.email,
                isAdmin: user.isAdmin,

            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}
export const login_post = (req, res) => {
    res.render('user login');
}


export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body


    console.log("ssa")

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        console.log("sss")
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})


export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name=req.body.name ||user.name
        user.email=req.body.email ||user.email
        if (req.body.password){
            user.password=req.body.password ||user.password

        }
        const updatedUser=await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
        
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })