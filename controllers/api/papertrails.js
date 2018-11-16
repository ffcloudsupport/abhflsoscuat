/*--------------------------------------------------------------------------------------------
Source Code Header
Program Name	:	papertrails.js
Module Name		:	papertrails
Description  	:	In this program we are processing log details.

Company Name	:	ITSS Research and Consultancy Pvt. Ltd.
Address			: 	#458, 38th Cross, Rajajinagar, Bangalore-560010, Karnataka, India.
					Ph.(080)23423069, www.itssrc.com, E-mail: info@itssrc.com
Client Name 	:	FinFort
Initial Ver&Date:   1.0, 19/09/2017
Created By		:	SEKAR RAJ
---------------------------------------------------------------------------------------------
REVISION HISTORY
Version No		:	Revision Date:		Revised By			Details
1.1					23/02/2018			Namratha B Gowda	Changed AHFL to DHFL and Added one more condition for return url logs
---------------------------------------------------------------------------------------------*/


const fs = require('fs');
const winston = require('winston');
require('winston-papertrail').Papertrail;

const data = fs.readFileSync('./ITSSRCConfig.json', 'UTF-8');
if (!data) {
    console.log('Error occured while reading config file');
}
else {
    const jsonData = JSON.parse(data);
    var paHost = jsonData.papertrialHost;
    var paPort = jsonData.papertrialPort;
    var hostName = jsonData.papertrialHostName;
}


module.exports = {
	
    LOSerrortrack(num,Messages) {
			const logger = new winston.Logger({
			transports: [
				new winston.transports.Papertrail({
					host: paHost,
					port: paPort,
					hostname: hostName,
					logFormat(level, message) {
						return '[' + level + '] ' + message;
					},
				}),
				new winston.transports.Console({
					level: 'debug',
					timestamp() {
						return new Date().toString();
					},
					colorize: true,
				}),
			   
			],

		});
			if (num==1)
				
			{
					logger.info('EventType:Timestamp : ' +' '+ new Date().toString());
					logger.info('EventType:Lender Name :' +' '+ 'ABHFL');
					logger.info('EventType:Error :' +' '+ Messages +'  ');
			}
			else if(num==2)
				
			{		
					logger.info('EventType:Timestamp: ' +' '+ new Date().toString());
					logger.info('EventType:Lender Name :' +' '+ 'ABHFL');
					logger.info('EventType:Order Details Before Insert :' +' '+ Messages +'  ');
			}
			else if(num==3)
				
			{		
					logger.info('EventType:Timestamp: ' +' '+ new Date().toString());
					logger.info('EventType:Lender Name : ' +' '+ 'ABHFL');
					logger.info('EventType:Order Details After Insert :' +' '+ Messages +'  ');
			}
			else if(num==4)
				
			{		
					logger.info('EventType:Timestamp: ' +' '+ new Date().toString());
					logger.info('EventType:Lender Name : ' +' '+ 'DHFL');
					logger.info('EventType:ReturnURL details :' +' '+ Messages +'  ');
			}
			
		
		
	},
	
};
	