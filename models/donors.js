const mongoose = require('mongoose');

const donorsSchema = mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String,
    },
   
    district:{
        required:true,
        type:String,
        trim:true,
        
    },

    address: {
        type: String
    },
    phoneNumber: {
        required:true,
        type: String,
        
    },
    age: {
        required: true,
        type: String,
        validate: {
            validator: (value) => {
                return value !== null && typeof value === 'string' && value >= '18';
            },
            message: 'people of age 18 or above are eligible to donate blood'
        }
    },
    

    bloodGroup: {
        required:true,
        type: String,
    },
    images: {
        type: String
    },
   
   
   
  
});

const Donors = mongoose.model('Donors', donorsSchema);
module.exports = Donors;
