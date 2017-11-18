var mongoose = require("mongoose");


var deviceSchema = mongoose.Schema({
    MACAddress: String,

    user: {
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },

    IP: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },

    //1:Active 0:Deactive
    status: {
        type: Number,
        default: 1,
    } 
});

module.exports = mongoose.model("Device", deviceSchema);