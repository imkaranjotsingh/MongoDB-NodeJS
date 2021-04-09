var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var userSchema = new Schema({
    
     name : String,
     password : String,
     address : String,
     city : String,
     email : String
 });
  
 module.exports = mongoose.model('User',userSchema);