var express = require('express');
var Device = require("../schemas/device");
var User = require("../schemas/user")
var jwt = require('jsonwebtoken');

function checkToken(req, res) {
    jwt
        .verify(req.body.token, "3Dozde Boz Dozd Raftan Boz Dozdi YeDozde Boz Dozd 3Boz Dozdid 3 Dozde Boz Dozd B" +
        "e Ye Dozde Boz Dozd Goftan Ma Ke 3 Dozde Boz Dozdim Ye Boz Dozdidim Toke YE Dozd" +
        "e Boz Dozdi 3 Boz Dozdidi.",
        function (err, decoded) {
            if (err) {
                res.send({ auth: false, error: err });
            } else {
                Device
                    .findOne({
                        _id: decoded.id
                    }, function (err, foundDevice) {
                        if (err) {
                            res.send({ foundDevice: false, error: err });
                        } else {
                            User
                                .findOne({ _id: foundDevice.user })
                                .exec(function (err, foundUser) {
                                    if (err) {
                                        return res.send({ foundUser: false, auth: false, error: err })
                                    }

                                })
                        }
                    })
            }
        })

};
module.exports ={checkToken : checkToken} ;