var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    price : String,
    desc : String,
    file : String
});

module.exports = mongoose.model('Product',productSchema);