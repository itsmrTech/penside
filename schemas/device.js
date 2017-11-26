var mongoose = require("mongoose");


var deviceSchema = mongoose.Schema({
    MACAddress: {
        type: String,
        required: true
    },

    user: {
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },

    IP: {
        type: String,
        required: true
    },

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