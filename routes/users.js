var express = require('express');
var User = require("../schemas/user");
var bcrypt   = require('bcrypt-nodejs');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", function (req, res) {
  var newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    signature: req.body.signature,
    email: req.body.email,
    password: generateHash(req.body.password),
    phone: req.body.phone,
  });

  newUser.save(function (err, registeredItem) {
    if (err) {
      res.send({
        registeredStatus: false,
        error: err
      });
    }
    else {
      res.send({
        registeredStatus: true,
        registeredUser: registeredItem
      });
    }
  })
})

// generating a hash
function generateHash (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
function isValidPassword(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = router;
