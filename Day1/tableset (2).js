var express = require('express');
var routes = require('routes');
var http = require('http');
var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');

var testtable = require('./routes/testtable');
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); 
var mysql = require('mysql');

app.set('port',process.env.PORT || 4300);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/mydb91";

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, "js")));

app.get('/',function(req,res)
{
res.render('index');
});

app.get('/login',function(req,res)
{
res.render('login');
});

	app.post('/inserCust', function (req, res) {
	mongoose.connect(url, function(err, db) {
		db.collection('customers').insertOne({
			ename: req.body.uname,
			emessage: req.body.message,
			epassword: req.body.password,
			email:req.body.email
		});
	});
	
});
app.post('/checklogin', function (req, res) {
	mongoose.connect(url, function(err, db) {
		db.collection('customers').findOne({ename:req.body.uname,epassword:req.body.password,}, function (errs, person) {
		  if (errs) throw errs;
			if(person){
				res.render('userdata',{data:person});
			}else{
				res.redirect('/login');
			}
		});
	});
	
});





app.post('/custSearch', function (req, res) {
	//console.log("Enter");
	//res.send(req.body.name+" "+req.body.email+"hello");
mongoose.connect(url, function(err, db) {

    var cursor = db.collection('customers').find();

    cursor.each(function(err, doc) {

      //  console.log(doc);
		//res.send(doc);
		

    });
	
	
}); 
})

app.get('/delete/:userId', function (req, res) {
    
	id=req.params.userId;
	var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/mydb91";

mongoose.connect(url, function(err, db) {
  if (err) throw err;
  
  var myquery = { ename:id };
  db.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});
})


app.get('/edit/:userId', function (req, res) {
	var sql = req.params.userId;
	mongoose.connect(url, function(err, db) {
		db.collection('customers').findOne({ename:sql}, function (errs, person) {
		  if (errs) throw errs;
			if(person){
				res.render('editUser',{data:person});
			}else{
				res.redirect('/login');
			}
		});
	});
	
	
	
	
	
	
	
	
})






http.createServer(app).listen(app.get('port'),function(){
	console.log('Express Server listening on Port '+app.get('port'));
});