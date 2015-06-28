// dependencies
var AWS = require('aws-sdk');
// var Firebase = require('firebase');
var globalConfig = require("./globalConfig");
 
/*
exports.handler = function(event, context) {
	console.log("hello lambda")
};

console.log('Loading function');

*/

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var message = JSON.parse(event.Records[0].Sns.Message);
    console.log('From SNS:', message);
    graph_id = message.graphId;
    var root = new Firebase(globalConfig.firebaseUrl);
    root.child("graphs").child(graph_id).once('value', function(snap) {
		console.log("snap: ", snap.val());
		context.succeed(message)
	});
};

