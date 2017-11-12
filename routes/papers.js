var express = require('express');
var router = express.Router();
var Paper = require("../schemas/paper");

router.post('/add', function (req, res) {
    var newPaper = new Paper({
        title : req.body.title,
        text : req.body.text
    });
    newPaper.save();
});

module.exports = router;