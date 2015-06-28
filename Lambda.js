// dependencies
var AWS = require('aws-sdk');
var Firebase = require('firebase');
var globalConfig = require("./globalConfig");
var cardTypes = require("./cardTypes")
 
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
    var graph_id = message.graphId;
    var root = new Firebase(globalConfig.firebaseUrl);
    root.child("graphs").child(graph_id).once('value', function(snap) {

        var graphData = snap.val();

        var cards = graphData.cards;

		console.log("snap: ", snap.val());
        console.log("node id: ", message.nodeId);
        var rootNode = cards[message.nodeId];
        console.log("node: ", rootNode);
		context.succeed(message);
	});
};

