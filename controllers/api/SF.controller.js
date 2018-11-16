var config = require('config.json');
var express = require('express');
var router = express.Router();
var FFSFDBFunc = require('services/SF.service');

var fs = require('fs');
var errorLog = require('./papertrails.js');
// const JSONPath = require('JSONPath');
var data = fs.readFileSync('ITSSRCConfig.json', 'UTF-8');
var jsonData = JSON.parse(data);
var fromMail = jsonData.emailFrom;
var toEmail = jsonData.emailNotificationTO;
var ccEmail = jsonData.emailNotificationCC;
var api_Key = jsonData.emailServerAPIKey;
var domain = jsonData.emailServerDomain;
var mailgun = require('mailgun-js')({ apiKey: api_Key, domain });
 
// routes
//router.put('/Update', Update);
router.post('/Save', Save);
//router.get('/Orders', GetAll);
router.get('/:_id', GetById);
//router.delete('/:_id', deleteOrder);



 
module.exports = router;


function Save(req, res) {
	console.log('HIIIIIIIIIIIIIIIIIII Save');
	// object api
	const Order   = 'Order__c';
	
	var test = JSON.stringify(req.body);
	console.log(test);
	errorLog.LOSerrortrack(2,test);
	
	FFSFDBFunc.iSFCreate(Order, req.body)
	.then(function (Order) {
		console.log(req.body.OrderCreatedBy__c,req.body.name);
		res.status(200).send(Order);
		console.log(Order);
	})
	.catch(function (err) {
		console.log('failure in sf controller'+err);
		var errorDetails = JSON.stringify(err);
		errorLog.LOSerrortrack(1,errorDetails);
		res.status(400).send(err);
	});
        
}

// Sending mailgun
function sendMail(username,orderNo,Branch,BorrowerName,refNum,panNo){
	 const maildata = { from: fromMail,
	 to: username,
	 cc: ccEmail,
	 subject: 'Order Successfully Created - ' +  Branch + ' ,' +  orderNo + ' ,' +  BorrowerName + ','+ refNum + ',' + panNo,
	 html: "<br>" + 'This is to confirm that' + ' ' + orderNo + ' ' + ' has been successfully created.' + "<br> " + 'In case of need please contact us at the details given below.' + "<br> " + "<br>"  + 'Kind Regards,' + "<br> " + 'Lender Support '+ "<br> " + 'Finfort Infotech LLP ' + "<br> " + 'Contact:' + "<br> " + '239, First Floor, 18th Cross, 6th Block,' + "<br> " + 'Koramangala, Bangalore – 560095'+ "<br> " + 'Timings: ' + "<br> " + 'Monday to Friday: 8AM –8PM ' + "<br> " + 'Saturday: 8AM to 2PM' + "<br> " + 'Phone: 080-46404242' + '/' + ' 91 8105811664 '+ "<br> " + ' Email: lendersupport@finfort.ind.in ' };
        mailgun.messages().send(maildata, (error, body) => {
			if (error) {
				console.log(' error occured while sending success mail');
			}
			else {
				console.log(' mail sent Sucessfully');
			}
		});
}

/*
function Update(req, res) {
	console.log('HIIIIIIIIIIIIIIIIIII Update');
	// object api
	const Order   = 'Order_external__c';
	//ExterId col Name
	var orderExtcolName  = 'FF_Order__c' ;
	FFSFDBFunc.SFUpdate(Order, orderExtcolName, req.body)
	.then(function () {
		res.sendStatus(200);
	})
	.catch(function (err) {
		console.log(err);
		res.status(400).send(err);
	});
        
}


function GetAll(req, res) {
	console.log('HIIIIIIIIIIIIIIIIIII GetAll');
	const Order   = 'Order_external__c';
	
	FFSFDBFunc.SFGetAll(Order)
	.then(function (OrderList) {
		res.status(200).send(OrderList);
	})
	.catch(function (err) {
		console.log(err);
		res.status(400).send(err);
	});
        
}*/


function GetById(req, res) {
	console.log('HIIIIIIIIIIIIIIIIIII GetById');
	const Order   = 'Order__c';
	console.log(req.params._id);
	//var orderExtcolName  = 'FF_Order__c' ;
	
	FFSFDBFunc.iSFRetreive(Order,req.params._id)
	.then(function (OrderList) {
		console.log(OrderList.Name,OrderList.OrderCreatedBy__c);
		sendMail(OrderList.OrderCreatedBy__c,OrderList.Name,OrderList.Branch__c,OrderList.Loan_Applicant_Name__c,OrderList.LenderReferenceNumber__c,OrderList.Loan_Applicant_PAN__c);
		res.status(200).send(OrderList);
	})
	.catch(function (err) {
		console.log(err);
		res.status(400).send(err);
	});
        
}


/*function deleteOrder(req, res) {
	console.log('HIIIIIIIIIIIIIIIIIII Delete');
	const Order   = 'Order_external__c';
	var orderExtcolName  = 'FF_Order__c' ;
	console.log(req.params._id);
	FFSFDBFunc.SFDelete(Order,req.params._id)
	.then(function () {
		console.log('delete Success');
		res.sendStatus(200);
	})
	.catch(function (err) {
		console.log(err);
		res.status(400).send(err);
	});
        
}*/


 


 

 

