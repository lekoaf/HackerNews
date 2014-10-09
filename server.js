var express = require('express');
var http = require('http');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res){
	res.sendfile('./index.html');
});

http.createServer(app).listen(3000);