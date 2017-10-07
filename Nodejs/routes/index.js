var express = require('express');
var router = express.Router();

/*
var Web3        = require('web3'),
contract    = require("truffle-contract"),
path        = require('path')
MetaCoin    = require(path.join(__dirname, '../../build/contracts/MetaCoin.json'));


var provider    = new Web3.providers.HttpProvider("http://localhost:8545"),    
filePath    = path.join(__dirname, '../../build/contracts/MetaCoin.json');

var MetaCoinContract = contract(MetaCoin);
MetaCoinContract.setProvider(provider);
*/

/* GET home page. */
router.get('/', function(req, res, next) {

    MetaCoinContract.deployed().then(function(instance) {

        return  instance.getBalance.call(
            '0x2062f56fdfc1027a399a9bcfaaf15cf376306494', 
            {from: '0x2062f56fdfc1027a399a9bcfaaf15cf376306494'})
    }).then(function(result) {
        console.log(result);
        res.render('index', { title: result.valueOf() });
        
    }, function(error) {
        console.log(error);
    }); 

    //res.render('index', { title: 'Express' });
  });
  router.get('/user', function(req, res, next) {
    
        MetaCoinContract.deployed().then(function(instance) {
    
            return  instance.getBalance.call(
                '0x9bc539abf25f0a1c0788ff5da5cfc652b7bf4e32', 
                {from: '0x9bc539abf25f0a1c0788ff5da5cfc652b7bf4e32'})
        }).then(function(result) {
            console.log(result);
            res.render('index', { title: result.valueOf() });
            
        }, function(error) {
            console.log(error);
        }); 
    
        //res.render('index', { title: 'Express' });
      });
      router.get('/orlan', function(req, res, next) {
        
            MetaCoinContract.deployed().then(function(instance) {
        
                return  instance.getBalance.call(
                    '0xbd5ca763c3f799a08e0179b3c08834e49de05704', 
                    {from: '0xbd5ca763c3f799a08e0179b3c08834e49de05704'})
            }).then(function(result) {
                console.log(result);
                res.render('index', { title: result.valueOf() });
                
            }, function(error) {
                console.log(error);
            }); 
        
            //res.render('index', { title: 'Express' });
          });

          router.get('/address/:address', function(req, res, next) {
            
                MetaCoinContract.deployed().then(function(instance) {
            
                    return  instance.getBalance.call(
                        req.params.address, 
                        {from: '0x2062f56fdfc1027a399a9bcfaaf15cf376306494'})
                }).then(function(result) {
                    console.log(result);
                    res.render('index', { address: req.params.address,
                        cash: result[0].valueOf(),
                        point: result[1].valueOf() });

                }, function(error) {
                    console.log(error);
                }); 
            
                //res.render('index', { title: 'Express' });
              });
module.exports = router;
