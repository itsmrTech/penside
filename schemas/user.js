var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    // require field should be applied
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    signature: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        unique: true,
        required: true
    },

    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    
    picture: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'File'
    },

    status: {
        type: Number,
        default: 1
    }, //1: show , 0:hide

    createdAt: {
        type: Date,
        default: Date.now
    }

});



module.exports = mongoose.model('User', userSchema);