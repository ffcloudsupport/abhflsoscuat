// call the packages we need
const fs = require('fs');
var errorLog = require('controllers/api/papertrails.js');
const jsforce = require('jsforce');
var Q = require('q');
 
//Fetch the configuration information from config file
var ijsonConfigData;
const iConfigData = fs.readFileSync('./ITSSRCConfig.json', 'UTF-8');
if (!iConfigData) {
    console.log('Error occured while reading ITSSRCConfig.json');
} else {
	 ijsonConfigData = JSON.parse(iConfigData);
}

//Initialize the SF connection
var iSFConn = new jsforce.Connection({
  oauth2 : {
    loginUrl : ijsonConfigData.loginURL,
    clientId : ijsonConfigData.clientID,
    clientSecret : ijsonConfigData.clientSecret,
    redirectUri : ijsonConfigData.redirectURI
  }
});

var service = {};

service.iSFCreate = iSFCreate;
service.iSFRetreive = iSFRetreive;


module.exports = service;

	//Library function to retreive a record for a given id
	function iSFRetreive(iSFObj, iSFObjId) {
		var deferred = Q.defer();
		
		iSFConn.login(ijsonConfigData.username, ijsonConfigData.password, function(err, userInfo) {
			if (err) { 
				//return console.error(err);
				deferred.reject(err);				
			} else {
				iSFConn.sobject(iSFObj).retrieve(iSFObjId, function(err, account) {
					if (err) { 
						//return console.error(err); 
						deferred.reject(err);
					} else {
						var afterIns = JSON.stringify(account);
						console.log(afterIns);
						errorLog.LOSerrortrack(3,afterIns);
					}
					
					//The connection opened to extract or retreive data of a particular Id 
					iSFConn.logout(function(err) {
						if (err) { 
							deferred.reject(err);
						}
						// now the session has been expired. 
						console.log("The connection has been logged out. ");
					});
					deferred.resolve(account);			
				});
			}
		});
		return deferred.promise;
	}
	
	//Library function to create a record for a given json object
	function iSFCreate(iSFObj, iSFJSONObj) {
		var deferred = Q.defer();
		iSFConn.login(ijsonConfigData.username, ijsonConfigData.password, function(err, userInfo) {
			if (err) { 
				//return console.error(err);
				deferred.reject(err);
			}
			iSFConn.sobject(iSFObj).create(iSFJSONObj, function(err, ret) {
				if (err) { 
					//return console.error(err);
					deferred.reject(err);
				}
				console.log("Created record id : " + ret);
				console.log(ret);
				//The connection opened to create record data for a given JSON Object values
				iSFConn.logout(function(err) {
					if (err) { 
						//return console.error(err); 
						deferred.reject(err);
					}
					// now the session has been expired. 
					console.log("The connection has been logged out. ");
				});
				deferred.resolve(ret);				
			});
		});	
		return deferred.promise;
	}

	//Library function to update a record for a given json object
	/*iSFUpdate(iSFObj, iSFJSONUObj, callback) {
		iSFConn.login(ijsonConfigData.username, ijsonConfigData.password, function(err, userInfo) {
			if (err) { return console.error(err); }
			iSFConn.sobject(iSFObj).update(iSFJSONUObj, function(err, ret) {
				if (err) { return console.error(err); }
				//console.log("Created record id : " + ret.id);
				
				//The connection opened to update record data for a given JSON Object values and id
				iSFConn.logout(function(err) {
					if (err) { return console.error(err); }
					// now the session has been expired. 
					console.log("The connection has been logged out. ");
				});
				callback(ret);			
			});
		});	
	},

	//Library function to upsert a record for a given json object and a external id
	iSFUpsert(iSFObj, iSFJSONUIObj, iExtId, callback) {
		iSFConn.login(ijsonConfigData.username, ijsonConfigData.password, function(err, userInfo) {
			if (err) { return console.error(err); }
			iSFConn.sobject(iSFObj).upsert(iSFJSONUIObj, iExtId, function(err, ret) {
				if (err) { return console.error(err); }
				//console.log("Created record id : " + ret.id);
				
				//The connection opened to upsert record data for a given JSON Object values and external id
				iSFConn.logout(function(err) {
					if (err) { return console.error(err); }
					// now the session has been expired. 
					console.log("The connection has been logged out. ");
				});
				callback(ret);			
			});
		});	
	},

	//Library function to delete a record for a given object id
	iSFDelete(iSFObj, iSFDObjId, callback) {
		iSFConn.login(ijsonConfigData.username, ijsonConfigData.password, function(err, userInfo) {
			if (err) { return console.error(err); }
			iSFConn.sobject(iSFObj).destroy(iSFDObjId, function(err, ret) {
				if (err) { return console.error(err); }
				//console.log("Created record id : " + ret.id);
				
				//The connection opened to delete record data for a given  id
				iSFConn.logout(function(err) {
					if (err) { return console.error(err); }
					// now the session has been expired. 
					console.log("The connection has been logged out. ");
				});
				callback(ret);			
			});
		});	
	}	
}*/

