var express = require('express');

var router =express.Router();
var fs = require('fs');



var User = require('../models/user');
var Product = require('../models/product');

 
router.get('/',function(req,res)
{

    Product.find({},function(err,result)
    {
        if(err)throw err;
        console.log(result);
        res.render('index',{data:result});
    })
    
});
 
router.get('/register',function(req,res)
{
    res.render('register');
})


router.post('/register',function(req,res)
{
    var name = req.body.name;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var email = req.body.email;
    //res.send(name+" "+password+" "+address+" "+city+" "+email);
    console.log(name+" "+password+" "+address+" "+city+" "+email);

    var  user = new User();
    user.name = name;
    user.password = password;
    user.address = address;
    user.city = city;
    user.email = email;
    user.save(function(err,result)
    {
        if(err)throw err;
        console.log(result);
    }); 
})

router.get('/login',function(req,res)
{

    res.render('login');
});

router.post('/login',function(req,res)
{


     User.findOne({name : req.body.name, password : req.body.password},function(err,result)
     {
        if(err)throw err;
        if(result){
                   res.render('data',{data:result})
        }else{
            res.redirect('/login');
        }
        })
     });


router.get('/data',function(req,res)
{
    res.render('data');
});

            
module.exports = router;