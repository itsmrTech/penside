var express = require('express');
var router = express.Router();
var Paper = require("../schemas/paper");
var Device = require("../schemas/device");
var User = require("../schemas/user");
var { checkToken } = require("../midlewares/auth")
var jwt = require('jsonwebtoken');

router.post("/add", checkToken, function (req, res) {
    var newPaper = new Paper({
        title: req.body.title,
        text: req.body.text,
        user: req.body.user
    });
    newPaper.save(function (err, savedPaper) {
        if (err)
            return res.status(500).json({ error: err, saved: false })
        if (!savedPaper)
            return res.status(404).json({ error: "Paper not saved", saved: false })
        res.status(200).json({ saved: true, paper: savedPaper })
    })
    console.log(req.user.firstName);
})
module.exports = router;