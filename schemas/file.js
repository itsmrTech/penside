var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    path:{
        type: String,
        unique: true,
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    type:String,
    status: {
        type: Number,
        default: 1
    }, //1: show 0:hide


    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('File',fileSchema);


