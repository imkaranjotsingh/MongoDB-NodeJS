var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cartSchema = new Schema({
    name : String,
    id : String,
    name : String,
    price : String,
    number : Number,
    email : String,
    desc : String,
    date : String,
    file : String

});

module.exports = mongoose.model('Cart',cartSchema);