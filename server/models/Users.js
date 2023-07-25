const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    mobile:{
        type: String,
        required: true,
        // match: '^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$',
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type: String
    }
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;