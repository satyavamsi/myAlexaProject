var Alexa = require('alexa-sdk');
var APP_ID = "";

exports.handler = function(event, context, callback){
	var alexa = Alexa.handler(event,context,callback);
	alexa.app_Id = APP_ID;
	alexa.execute();
}