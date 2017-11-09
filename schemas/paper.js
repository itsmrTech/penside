var mongoose = require('mongoose');

var paperSchema = mongoose.Schema({
    title: String,
    text: String,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },


    status:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Paper', paperSchema);