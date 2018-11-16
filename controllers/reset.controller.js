var express = require('express');
var router = express.Router();
var dialog = require('dialog');
var request = require('request');
var config = require('config.json');
var mongo = require('mongoskin');

//Added for random generation of password
var bcrypt = require('bcryptjs'); 
var generator = require('generate-password');

var fs = require('fs');
var data = fs.readFileSync('ITSSRCConfig.json', 'UTF-8');
var jsonData = JSON.parse(data);
var fromMail = jsonData.emailFrom;
var toEmail = jsonData.emailNotificationTO;
var ccEmail = jsonData.emailNotificationCC;
var api_Key = jsonData.emailServerAPIKey;
var domain = jsonData.emailServerDomain;
var mailgun = require('mailgun-js')({ apiKey: api_Key, domain });
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

router.get('/', function (req, res) {
    res.render('reset');
});
 
router.post('/', function (req, res) {
	var username = req.body.username;
	db.users.findOne({ username: username }, function (err, user) {
		if (!user){
				//console.log('user does not exist');
				return res.render('reset', { err: 'No account with that user name exists' });
				
			}
			else {
				updatepassword(user._id,user);
				return res.render('reset', { success: 'An e-mail has been sent to ' + username + ' with further instructions.' });
				
			}
			
		});
	
});

function updatepassword(_id,user){
	
	var GenPassword = generator.generate({
		length: 10,
		numbers: true
	});
	var saltRounds = 10;
	var myPlaintextPassword = GenPassword;
	//var someOtherPlaintextPassword = 'not_bacon';
	
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash1 = bcrypt.hashSync(myPlaintextPassword, salt);
	console.log('.................................56');
	console.log(hash1);
	console.log(GenPassword);
	
	//console.log(_id,user);
	var userpassword = hash1;
	 var set = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
			hash: userpassword
        };
 
		console.log(set);
        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
               if(!err){
				   sendPwdResetMail(user.username,GenPassword);
			   }
            });
	
}

function sendPwdResetMail(username,GenPassword){
	const maildata = { from: fromMail,
	 to: username,
	 cc: 'test@itssrc.com',
	 subject: 'Password Updated Successfuly for ' +  username ,
	 text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        '\n\n' + 'User Name: ' + username + '\n\n' + 'Password: '+ GenPassword +  '\n\n' +
	    'Please change your password on login to secure your credentials.\n'};
        mailgun.messages().send(maildata, (error, body) => {
			if (error) {
				console.log(' error occured while sending success mail');
			}
			else {
				console.log(' mail sent Sucessfully');
			}
		});
	
}

 
module.exports = router;