// dependencies
var AWS = require('aws-sdk');
 
/*
exports.handler = function(event, context) {
	console.log("hello lambda")
};

console.log('Loading function');

*/

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var message = event.Records[0].Sns.Message;
    console.log('From SNS:', message);
    context.succeed(message);
};

