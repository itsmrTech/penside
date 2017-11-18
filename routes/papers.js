var express = require('express');
var router = express.Router();
var Paper = require("../schemas/paper");
var Device = require("../schemas/device");
var jwt = require('jsonwebtoken');


router.post('/add', function (req, res) {
    jwt.verify(req.body.token, "3Dozde Boz Dozd Raftan Boz Dozdi YeDozde Boz Dozd 3Boz Dozdid 3 Dozde Boz Dozd Be Ye Dozde Boz Dozd Goftan Ma Ke 3 Dozde Boz Dozdim Ye Boz Dozdidim Toke YE Dozde Boz Dozdi 3 Boz Dozdidi.",
        function (err, decoded) {
            if (err) {
                res.send({
                    auth: false,
                    error: err
                });
            }
            else {
                Device.findOne({
                    _id: decoded.id
                }, function (err, foundDevice) {
                    if (err) {
                        res.send({
                            foundDevice: false,
                            error: err
                        });
                    }
                    else {

                    }
                })

                var newPaper = new Paper({
                    title: req.body.title,
                    text: req.body.text,
                    user: req.body.user_id,
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
            }
        })



});

module.exports = router;