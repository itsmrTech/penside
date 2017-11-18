var express = require('express');
var router = express.Router();
var Paper = require("../schemas/paper");

router.post('/add', function (req, res) {
    var newPaper = new Paper({
        title: req.body.title,
        text: req.body.text,
        user:req.body.user_id,
    });

    newPaper.save(function (err, savedItem) {
        if (err) {
            res.send({
                savedStatus: false,
                error: err
            });
        }
        else {
            res.send({
                savedStatus: true,
                savedPaper: savedItem
            })
        }
    })

});

module.exports = router;