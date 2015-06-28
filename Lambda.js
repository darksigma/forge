// dependencies
var AWS = require('aws-sdk');
var Firebase = require('firebase');
var Promise = require('promise');
var PromiseSeries = require('promise-series');
var globalConfig = require("./globalConfig");
var cardTypes = require("./cardTypes")
 
/*
exports.handler = function(event, context) {
	console.log("hello lambda")
};

console.log('Loading function');

*/

evaluateCard = function(cards, cardId, requestId) {
    return new Promise(function(resolve, reject) {
        var typeInfo = cardTypes[cards[cardId].type];
        var ins = {};
        var series = new PromiseSeries();
        for (var inputLabel in typeInfo.inputs){
            inputCardId = cards[cardId].inputs[inputLabel];
            inputValue = evaluateCard(cards, inputCardId, requestId);
            series.add(inputValue);
        }
        series.run().then(function(values){
            var inputs = {};
            var i;
            for (i = 0; i < values.length; i++){
                inputs[typeInfo.inputs[i]] = values[i];
            }
            fn = typeInfo.run
            return resolve(fn(inputs, cards[cardId], requestId))
        })
    });
}

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

