/*--------------------------------------------------------------------------------------------
Source Code Header
Program Name	:	server.js
Module Name		:	server
Description  	:	Root file for complete SOSC

Company Name	:	ITSS Research and Consultancy Pvt. Ltd.
Address			: 	#458, 38th Cross, Rajajinagar, Bangalore-560010, Karnataka, India.
					Ph.(080)23423069, www.itssrc.com, E-mail: info@itssrc.com
Client Name 	:	FinFort
Initial Ver&Date:   1.0, 19/09/2017
Created By		:	SEKAR RAJ
---------------------------------------------------------------------------------------------
REVISION HISTORY
Version No		:	Revision Date:		Revised By			Details
1.1					23/02/2018			Namratha B Gowda	Added try and catch and error recovery of returnurl and storing logs in papertrial in controller/login.controller.js file and added 4th condition in papertrial.js and changed the version of node and npm
---------------------------------------------------------------------------------------------*/require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
 
// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/itssregister'] }));
 
// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/reset', require('./controllers/reset.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/SF', require('./controllers/api/SF.controller'));
 
// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});


// start server
var PORT = process.env.PORT || 3501;
var server = app.listen(PORT, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
