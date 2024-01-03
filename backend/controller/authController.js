import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utils/generatedToken.js';
import bouncer from 'express-bouncer';
import auditLogger from '../utils/auditLog.js';
var bouncerVar = bouncer(500, 900000, 3)



const handleErrors = (err) => {
    console.log(err)
    let errors = { email: '', password: '' };

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properties.message)
            errors[properties.path] = properties.message.replace('Path', '');
        })
    }
    if (err.message.includes('User already exists')) {
        errors = { 'errors': 'User exists' }
        return errors
    }
    if (errors.email) {
        errors['email'] = errors['email'].replace('`email`', 'Email');
    }
    if (errors.name) {
        errors['name'] = errors['name'].replace('`name`', 'Name');
    }
    if (err.message.includes('isWhitespace')) {
        errors = { 'errors': "Password must not contain Whitespaces." }
        return errors
    }
    if (err.message.includes('isContainsUppercase')) {
        errors = { 'errors': "Password must have at least one Uppercase Character." }
        return errors
    }
    if (err.message.includes('isContainsLowercase')) {
        errors = { 'errors': "Password must have at least one Lowercase Character." }
        return errors
    }
    if (err.message.includes('isContainsNumber')) {
        errors = { 'errors': "Password must contain at least one Digit." }
        return errors
    }
    if (err.message.includes('isContainsSymbol')) {
        errors = { 'errors': "Password must contain at least one Special Symbol." }
        return errors
    }

    console.log(errors)
    return errors
}

function checkPasswordValidation(value) {
    const isWhitespace = /^(?=.*\s)/;
    if (isWhitespace.test(value)) {
        throw new Error("isWhitespace");

    }
    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
        throw new Error("isContainsUppercase");

    }
    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
        throw new Error("isContainsLowercase");

    }
    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
        throw new Error("isContainsNumber");
    }
    const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
        throw new Error("isContainsSymbol");
    }
    else {
        return null;
    }
}


export const signup_get = (req, res) => {
    console.log("Ss")
}
export const login_get = (req, res) => {
    res.render('login');
}


export const signup_post = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        checkPasswordValidation(password)
        console.log(req.body);
        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

export const login_post = (req, res) => {
    res.render('user login');
}


export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body


    console.log("ssa")

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {

        bouncerVar.reset(req)
        console.log("sss")
        auditLogger(user._id, user.email, 'has logged');
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
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password || user.password

        }
        const updatedUser = await user.save()

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
    console.log('hit')
    console.log(req.params.id)
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

export  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
      user.password = req.body.password

  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })