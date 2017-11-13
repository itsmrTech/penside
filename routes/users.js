var express = require('express');
var User = require("../schemas/user");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", function (req, res) {
  User.register(new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    signature: req.body.signature,
    email: req.body.email,
    phone: req.body.phone,
  }), req.body.password, function (err, registeredItem) {
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
module.exports = router;
