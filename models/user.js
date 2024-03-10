const mongose =require('mongoose');


const userSchema =mongose.Schema({
    username:{
        required:true,
        type:String,
        trim:true,
        validate:{
            validator:(value)=>{
               return value.length>2
            },
            message:'username should have more than 2 characters'
        }
    },
    email:{
        required:true,
        type:String,
        trim:true,
        validate:{
            validator:(value)=>{
             const re=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
             return value.match(re)
            },
            message:'please enter correct email'
        }
    },
    password:{
        required:true,
        type:String,
        validate:{
            validator:(value)=>{
                return value.length>6
            },
            message:"please enter more than 6 charaters"
        }
    },
    type:{
        type:String,
        default:'user'

    },
   

})

const User =mongose.model('User',userSchema)
module.exports =User