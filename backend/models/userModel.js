import mongoose from "mongoose"
import bcrypt from 'bcryptjs'


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        unique:false,
        minlength:[6,'Minimum password length is 6'],
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },

})


userSchema.methods.matchPassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

const User=mongoose.model('User',userSchema)


export default User