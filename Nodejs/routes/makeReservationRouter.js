var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Accounts = require('../models/accounts');
var mongoose = require('mongoose');

var reservationRouter = express.Router();
reservationRouter.use(bodyParser.json());

reservationRouter.route('/')
    .get(function (req, res, next) {

    })
    .post(function (req, res, next) {
        console.log("reservation post " + req.body);

        console.log(req.body.from);
        console.log(req.body.hotel);
        console.log(req.body.pointBooking);
        console.log(req.body.amount);
        var fromAccount;
        var bankAccount;
        var hotelAccount;
        Accounts.findOne({ id: 'POINTBANK' }, function (err, bank) {
            if (err) {
                console.log(err);
                return
            }
            console.log("bank address is " + bank.ethAccountAddress);
            bankAccount = bank.ethAccountAddress;

            Accounts.findOne({ id: req.body.from }, function (err, account) {
                if (err) {
                    console.log(err);
                    return
                }
                console.log("found guest walletid is " + account.ethAccountAddress);
                fromAccount = account.ethAccountAddress;

                Accounts.findOne({ id: req.body.hotel }, function (err, account) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log("found hotel walletid is " + account.ethAccountAddress);
                    hotelAccount = account.ethAccountAddress;
                    if (req.body.pointBooking) {
                        MetaCoinContract.deployed().then(function (instance) {
                            return instance.bookByPoint(
                                fromAccount, hotelAccount, bankAccount, req.body.amount,
                                { from: '0x2062f56fdfc1027a399a9bcfaaf15cf376306494' })
                        }).then(function (result) {
                            console.log(result);
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });
                            res.end('point booking done!');
                        }, function (error) {
                            console.log(error);
                        }).catch(function (e) {
                            console.log(e);
                        });
                    } else {
                        MetaCoinContract.deployed().then(function (instance) {
                            return instance.bookByCash(
                                fromAccount, hotelAccount, bankAccount, req.body.amount,
                                { from: '0x2062f56fdfc1027a399a9bcfaaf15cf376306494' })
                        }).then(function (result) {
                            console.log(result);
                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });
                            res.end('cash booking done!');
                        }, function (error) {
                            console.log(error);
                        }).catch(function (e) {
                            console.log(e);
                        });
                    }
                });
            });
        });
    })
    .delete(function (req, res, next) {

    });

module.exports = reservationRouter;
