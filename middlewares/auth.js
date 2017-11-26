var User = require("../schemas/user");
var Device = require("../schemas/device")
var jwt = require('jsonwebtoken');

var exp = {}
exp.checkToken = function (req, res, next) {
    //Verifing and decoding token which has device id
    jwt.verify(req.body.token, "3Dozde Boz Dozd Raftan Boz Dozdi YeDozde Boz Dozd 3Boz Dozdid 3 Dozde Boz Dozd Be Ye Dozde Boz Dozd Goftan Ma Ke 3 Dozde Boz Dozdim Ye Boz Dozdidim Toke YE Dozde Boz Dozdi 3 Boz Dozdidi."
        , function (err, decoded) {
            if (err)
                return res.status(401).json({ error: err, auth: false })
            // Find device from decoded token
            Device.findOne({ _id: decoded.id }, function (err, foundDevice) {
                if (err)
                    return res.status(500).json({ error: err, auth: false, foundDevice: false })
                if (!foundDevice)
                    return res.status(404).json({ error: "Device Not Found", auth: false, foundDevice: false })
                //Find user from found device
                User.findOne({ _id: foundDevice.user }, function (err, foundUser) {
                    if (err)
                        return res.status(500).json({ error: err, auth: false, foundDevice: true, foundUser: false })
                    if (!foundUser) {
                        return res.status(404).json({ error: "User Not Found", auth: false, foundDevice: true, foundUser: false })
                    }
                    // overwriting json for returning user object
                    req.user = foundUser;
                    next();
                })
            })
        })
}

module.exports = exp;