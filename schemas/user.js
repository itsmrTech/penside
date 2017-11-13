var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    signature: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String,
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