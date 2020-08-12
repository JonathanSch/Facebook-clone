const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    last_name : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true,
        unique : true
    },
    password : {
        type : String,
        required:true,
    },
    is_active : {
        default:true,
        type:Boolean
    },
    photo : {
        type : String
    }
},{timestamps:true})

personSchema.pre('save' , function(next){
    const person = this;
    if(!person.isModified('password')) return next();

    bcrypt.genSalt(10 , (err , salt)=>{
        if(err) return next(err);

        bcrypt.hash(person.password , salt , (error,hash) => {
            if(error) return next(error);

            person.password = hash
            return next();
        })
    })
})

const Person = mongoose.model('Person' , personSchema)

module.exports = {Person}