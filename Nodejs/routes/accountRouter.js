var express=require('express');
var morgan=require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Accounts = require('../models/accounts');

var accountRouter =  express.Router();
accountRouter.use(bodyParser.json());

accountRouter.route('/')
.get(function(req, res, next){
    Accounts.find({}, function (err, account) {
        if (err) throw err;
        res.json(account);
    });
})
.post(function(req, res, next){
    Accounts.create(req.body, function (err, account) {
        if (err) throw err;
        console.log('account created!');
        var id = account._id;
        createWalletAccount(id,"123456");
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the account with id: ' + id);
    });
})
.delete(function(req, res, next){

   Accounts.remove({}, function (err, resp) {
       if (err) throw err;
       res.json(resp);
   })
});

accountRouter.route('/:id')
.get(function(req, res, next){
    Accounts.findById(req.params.id, function (err, account) {
        if (err) throw err;
        res.json(account);
    });
})
.put(function (req, res, next) {
    Accounts.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, account) {
        if (err) throw err;
        res.json(account);
    });
})
.delete(function(req, res, next){
   Accounts.findByIdAndRemove(req.params.id, function(err, resp) {
       if (err) throw err;
       res.json(resp);
   });
});

function createWalletAccount(_id, password) {
    console.log("createWalletAccount id is " + _id);
    if (typeof web3 !== 'undefined')
        var web3 = new Web3(web3.currentProvider);
    else
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var newAccount = web3.personal.newAccount(password, function(e, result) {
        if (!e) {
            console.log("wallet account address:" + JSON.stringify(result));
            putWalletAddress(_id, result);
        } else {
            console.log("wallet account error" + result);
        }
    });
}

function putWalletAddress(_id, address) {
    Accounts.findByIdAndUpdate(_id, {
        ethAccountAddress: address
    }, {
        new: true
    }, function (err, result) {
        if (err) throw err;
        console.log("putWalletAddress result " + result);
        if(result.id=="POINTBANK") {
            console.log("init bank " + result);
            initBank(result.ethAccountAddress);
        } else {
            console.log("init address " + result);
            initAddr(result.ethAccountAddress);
        }
        //res.json(result);
    });
}

function initBank(address) {
    console.log("initBank " + address);
    MetaCoinContract.deployed().then(function(instance) {
        return  instance.initBankPoints(address, 10000,
            {from: '0x2062f56fdfc1027a399a9bcfaaf15cf376306494'})
    }).then(function(result) {
        console.log("initBank SUCCESS " + result);
    }, function(error) {
        console.log(error);
    }).catch(function(e) {
        console.log(e);
    });
}

function initAddr(address) {
    console.log("initBank " + address);
    MetaCoinContract.deployed().then(function(instance) {
        return  instance.initClient(address,
            {from: '0x2062f56fdfc1027a399a9bcfaaf15cf376306494'})
    }).then(function(result) {
        console.log("init address SUCCESS " + result);
    }, function(error) {
        console.log(error);
    }).catch(function(e) {
        console.log(e);
    });
}

module.exports = accountRouter;
