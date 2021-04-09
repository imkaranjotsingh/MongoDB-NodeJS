var mongoose = require('mongoose');
 var config = require('./index');

 var url = `mongodb://localhost/${config.dbname}`;

 mongoose.connect(url);
 mongoose.connection.on('connection',function()
 {
     console.log('Mongodb default connection is on port'+url);
 });