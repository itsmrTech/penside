var express = require('express');
var User = require("../schemas/user");
var Device = require("../schemas/device");
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Register New User
router.post("/register", function (req, res) {
  var newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    signature: req.body.signature,
    email: req.body.email,
    password: generateHash(req.body.password),
    phone: req.body.phone,
  });

  newUser.save(function (err, registeredUser) {
    if (err) {
      res.send({
        registeredStatus: false,
        error: err
      });
    }
    else {
      res.send({
        registeredStatus: true,
        registeredUser: registeredUser
      });
    }
  })
})

// Login User
router.post("/login", function (req, res) {
  User.findOne({
    $or: [{ email: req.body.authenticationField },
    { phone: req.body.authenticationField },
    { signature: req.body.authenticationField }]
  }, function (err, foundUser) {
    if (err) {
      res.send({
        loginedStatus: false,
        error: err
      });
    } else if (!foundUser) {
      res.send({
        loginedStatus: false
      });
    }
    else {
      //Check Password
      bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
        console.log(err,result)
        if (err) {
          res.send({
            loginedStatus: false,
            error: err,
          })
        }
        else if(result==false){
          res.send({
            loginedStatus:false,
            error:"Wrong Password"
          })
        } else {
          // Add Device 
          var newDevice = new Device(
            {
              MACAddress: req.body.MACAddress,
              user: foundUser._id,
              IP: req.body.IP,
            }
          );
          newDevice.save(function (err, savedDevice) {
            if (err) {
              res.send({
                loginedStatus: false,
                error: err
              });
            } else {
              
              var userForSend = {
                "_id": foundUser._id,
                "firstName": foundUser.firstName,
                "lastName": foundUser.lastName,
                "signature": foundUser.signature,
                "email": foundUser.email,
                "phone": foundUser.phone,
              }
              res.send({
                loginedStatus: true,
                loginedUser: userForSend,
                token: generateHash(savedDevice._id),
              });
            }
          });

          
        }
      })

    }
  })
})

// generating a hash
function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
function isValidPassword(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = router;
