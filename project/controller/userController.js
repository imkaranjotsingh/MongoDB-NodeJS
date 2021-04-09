var User = require('../models/user');
var Product = require('../models/product');
module.exports = {
    addUser: function()
    {
        var user = new User();
        user.name = req.body.name;
        user.password = req.body.password;
        user.address = req.body.address;
        user.city = req.body.city;
        user.email = req.body.email;
        user.save(function(err,result)
        {
            res.send('addUser')
        })
    }
}


module.exports = {
    addProduct : function ()
    {
        var product = new Product();
        product.name = req.body.name;
        product.price = req.body.price;
        product.desc = req.body.desc;
        product.file = req.file.filename;
        product.save(function(err,result)
        {
            res.send('addProduct');
        })
    }
}


module.exports = {
    addCart : function()
    {
        var cart = new cart();
        cart.name = req.body.name;
        cart.id = req.body.id;
        cart.name = req.body.name;
        cart.price = req.body.price;
        cart.desc = req.body.desc;
        cart.numner = req.body.number;
        cart.email = req.body.email;
        cart.file = req.body.file;
        cart.save(function()
        {
            res.send('addCart');
        })
    }
}

