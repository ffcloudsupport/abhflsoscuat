/*--------------------------------------------------------------------------------------------
Source Code Header
Program Name	:	login.controller.js
Module Name		:	login.controller
Description  	:	Related to user authentication and login.

Company Name	:	ITSS Research and Consultancy Pvt. Ltd.
Address			: 	#458, 38th Cross, Rajajinagar, Bangalore-560010, Karnataka, India.
					Ph.(080)23423069, www.itssrc.com, E-mail: info@itssrc.com
Client Name 	:	FinFort
Initial Ver&Date:   1.0, 19/09/2017
Created By		:	SEKAR RAJ
---------------------------------------------------------------------------------------------
REVISION HISTORY
Version No		:	Revision Date:		Revised By			Details
1.1					23/02/2018			Namratha B Gowda	Added try and catch and error recovery of returnurl and storing logs in papertrial
---------------------------------------------------------------------------------------------*/
var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var errorLog = require('controllers/api/papertrails.js');
 
router.get('/', function (req, res) {
    // log user out
    delete req.session.token;
 
    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;
 
    res.render('login', viewData);
});
 
router.post('/', function (req, res) {
    // authenticate using api to maintain clean separation between layers
   
	try{
   request.post({
        url: config.apiUrl + '/users/authenticate',
        form: req.body,
        json: true
    }, function (error, response, body) {
		console.log("controller\login.controller.js----body  " + body);
		console.log("controller\login.controller.js----response  " + response);
        if (error) {
            return res.render('login', { error: 'An error occurred' });
        }
		//Added this condition on 23/02/2018.. If some user password hashcode is missing in the database, app shouldn't crash
		if (req.body.username==null || req.body.password==null)
		{
			console.log('Username or password is undefined');
			 return res.render('login', { error: 'Username or password is undefined', username: req.body.username });
		}
		//Added end
        if (!body.token) {
            return res.render('login', { error: 'Username or password is incorrect', username: req.body.username });
        }
 
        // save JWT token in the session to make it available to the angular app
        req.session.token = body.token;
 
        // redirect to returnUrl
		////Added on 23/02/18 after app had crashed
		console.log("req.query.returnUrl........................" + req.query.returnUrl);
		var retrnurl=req.query.returnUrl;
		errorLog.LOSerrortrack(4,retrnurl);
		//Added end
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);
    });//Added on 23/02/18 after app had crashed
	}catch(e)
	{	
		errorLog.LOSerrortrack(4,retrnurl + 'error.............' + e );
		Console.log("App Crash is just missed. Error is  " + e);
	}//Added end
});
 
module.exports = router;