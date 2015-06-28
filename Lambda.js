// dependencies
var AWS = require('aws-sdk');
var Firebase = require('firebase');
 
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
    graph_id = message.graphId;
    new Firebase("https://forge-app2.firebaseio.com/graphs/" + graph_id).once('value', function(snap) {
		console.log(snap.val());
	});
};

