var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    signature: {
        type: String,
        unique: true
    },
    email: String,
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

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);