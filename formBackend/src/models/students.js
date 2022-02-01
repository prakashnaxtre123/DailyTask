const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"mailid already present"],
        validate(value){
            if(validator.isEmail(value)){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email")
                }
            }
        }
    },
    phone:{
        type:String,
        min:10,
        max:10,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    department:{
        type:String
    },
    tokens:[{
       token:{
        type:String,
        required:true
       }
    }]
    
    
})
//generating tokens
studentSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

//converting password into hashing.
studentSchema.pre("save", async function (next) {
    if(this.isModified("password")){
    console.log(`current pasword is: ${this.password}`);

    this.password = await bcrypt.hash(this.password, 10);
    console.log(`current pasword is: ${this.password}`);
    
    }
    
    next();
})
/* const bcrypt = require("bcrypt");
const saltRounds = 10;
const plainTextPassword1 =this.password;
bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    console.log(`Salt: ${salt}`);
    return bcrypt.hash(plainTextPassword1, salt);
  })
  .then(hash => {
    console.log(`Hash: ${hash}`);
    // Store hash in your password DB.
    
  })
  .catch(err => console.error(err.message)); */

//we will create a new connection
const Student = new mongoose.model('Student',studentSchema);
module.exports = Student;