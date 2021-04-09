var express = require('express');
var app = express();
var session = require('express-session');
//var passport = require('passport');
var path = require('path');
var bodyparser = require('body-parser');

var routes = require('./routes');
//var passport = require('/routes/passport');
require('./config/db');

app.use(express.static(path.join(__dirname,'public')));
app.set('views',__dirname+'/views');
//app.use('public',__dirname+'/public');
app.set('view engine','ejs');
app.use(bodyparser());
app.use(bodyparser.urlencoded({extended : false}));

app.use('/',routes);
//app.use('/',routes/passport);
app.use(session({secret :'sss',
resave :false,
saveUninitialized : false}))
;
//app.use(passport.initialize());
//app.use(passport.session());

app.listen(8000,function()
{
    console.log("Express Listening On PORT:::8000");
});