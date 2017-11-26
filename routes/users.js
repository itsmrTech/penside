var express = require("express");
var User = require("../schemas/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
var Router = express.Router();

// Register User
Router.post("/register", function (req, res) {
    var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        signature: req.body.signature,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: generateHash(req.body.password),
        //picture:
    })
    newUser.Save(function (err, registeredUser) {
        if (err)
            return res.status(500).json({ error: err, registeredStatus: false })
        else
            return res.status(200).json({ registeredUser: registeredUser, registeredStatus: true })
    })
})

// Login User
Router.post("/login", function (req, res) {
    // Finding User If Exist
    User.findOne({
        $or: [{ email: req.body.authenticationField }, { signature: req.body.authenticationField }, { phoneNumber: req.body.authenticationField }],
        function(err, foundUser) {
            if (err)
                return res.status(500).json({ error: err, loginedStatus: false, foundUser: false });

            if (!foundUser)
                return res.status(404).json({ error: "User not found", loginedStatus: false, foundUser: false });
            // Compare Entered Password With Db(Hashed) 
            bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
                if (err)
                    return res.status(500).json({ error: err, loginedStatus: false, foundUser: true })

                if (!result)
                    return res.status(401).json({ error: "Wrong Password", loginedStatus: false, foundUser: true })

                // Add Device For foundUser
                var newDevice = new device({
                    MACAddress: req.body.MACAddress,
                    user: foundUser._id,
                    IP: req.body.IP,
                })
                newDevice.Save(function (err, registeredDevice) {
                    if (err)
                        return res.status(500).json({ error: err, loginedStatus: false, foundUser: true, registeredDevice: false })
                    // Returning foundUser Information
                    var userForSend = new User({
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        signature: foundUser.signature,
                        email: foundUser.email,
                        phoneNumber: foundUser.phoneNumber
                    })
                    //Make Token
                    jwt.sign({ "id": registeredDevice._id }, "3Dozde Boz Dozd Raftan Boz Dozdi YeDozde Boz Dozd 3Boz Dozdid 3 Dozde Boz Dozd Be Ye Dozde Boz Dozd Goftan Ma Ke 3 Dozde Boz Dozdim Ye Boz Dozdidim Toke YE Dozde Boz Dozdi 3 Boz Dozdidi.",
                        function (err, token) {
                            if (err)
                                return res.status(500).json({ error: err, loginedStatus: false, foundUser: true, registeredDevice: false, tokenAuth: false })

                            return res.status(200).json({ loginedStatus: true, loginedUser: foundUser, token: token })
                        }
                    )
                })
            })
        }
    })
})

// Generating a hash
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
function isValidPassword(password) {
    return bcrypt.compareSync(password, this.local.password);
};