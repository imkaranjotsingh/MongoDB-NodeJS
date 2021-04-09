var express = require('express');

var router =express.Router();
var fs = require('fs');
var multer = require('multer');
var storage =multer.diskStorage({
    destination:(req,file,callback)=>
    {
        callback(null,"./public");
    },
    filename : (req,file,cb)=>
    {
        cb(null,(file.filename = file.originalname));
    }
})
var upload = multer({storage : storage});

router.use(express.static('./public'));


var User = require('../models/user');
var Product = require('../models/product');

router.get('/project/:_id',function(req,res)
{
    var id = req.params._id;
    console.log(id);
    res.render('project');
})
 
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

            




router.get('/edit/:id',function(req,res)
{
    var abc = req.params.id;
    console.log(abc);

    User.findOne({_id:abc},function(err,db)
    {
        if(err)throw err;
        if(db){

           // console.log(db);
        res.render('edit',{res:db});
    }else{
        res.render('data');

    }
});
});

router.post('/edit',function(req,res)
{
    var id = req.body.name;
    console.log(id);
    User.updateOne({"city":"bilaspur"},{$set:{"city":"yamunanagar"}},function(err,db)
    {
        if(err)throw err;
        console.log(db);
         res.redirect('/login');
    });
});



router.get('/delete/:id',function(req,res)
{
    // var id = req.params.id;
    // console.log(id);
    User.deleteOne({},function(err,result)
    {
        if(err)throw err;
        console.log(result)
    res.redirect('/register');
    })
})

router.get('/admin',function(req,res)
{
   
    // User.find({},function(err,result)
    // {
    //     if(err)throw err;
    //     if(result)
    //     {
    //       //  if(name=='admin' && password =='admin'){
    //       res.render('record',{ db:result});  
    //     }else{
            res.render('admin');
        }
    
   
// }else{
//     res.render('admin');

// }
//})
//}
);


router.post('/admin',function(req,res)
{
    var name =req.body.name;
    var password = req.body.password;
User.find({},function(err,result)
{
    if(err)throw err;
    //console.log(result);
  
    if(name=='admin'&& password=='admin')
    {
        console.log(name+" "+password);
        res.render('record',{date:result});
    }
    else{
        res.redirect('/admin');
    }
})  
});


router.get('/update',function(req,res)
{
    res.render('update');
});
router.get('/delete',function(req,res)
{
    User.deleteOne({},function(err,result)
    {
        if(err)throw err;
        console.log(result);
        res.redirect('/admin');
    })
})


  
router.get('/product',function(req,res)
{
    res.render('product');
});

router.post('/product',upload.single('file'),function(req,res)
{
    var name = req.body.name;
    var price = req.body.price;
    var desc = req.body.desc;
    var file = req.file.filename;
    //res.send(name+" "+price+" "+desc+" "+file);
    console.log(name+" "+price+" "+desc+" "+file);

    var product = new Product();
    product.name = name;
    product.price = price;
    product.desc = desc;
    product.file = file;
    product.save(function(err,result)
    {
        if(err)throw err;
        console.log(result);
        res.send(result);
    })
})

router.get('/upload',function(req,res)
{
    res.render('product1');
});

router.post('/upload',function(req,res)
{
    var name =req.body.name;
    var password = req.body.password;
    Product.find({},function(err,db)
    {
        if(err)throw err;
        //console.log(db);
    
    console.log(name +" "+password);;
    if(name=='product'&& password =='product')
    {
    res.render('upload',{dara:db});
 }else{
     res.redirect('upload');
 }
});
});

router.get('/upload',function(req,res)
{
    db.collectionProduct.deleteOne({},function(err,result)
    {
        if(err)throw err;
        console.log(result);
        //res.redirect('/upload');
    })
})
module.exports = router;