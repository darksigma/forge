// dependencies
var AWS = require('aws-sdk');
var Firebase = require('firebase');
var Promise = require('promise');
var PromiseSeries = require('promise-series');
var globalConfig = require("./app/globalConfig");
var cardTypes = require("./app/cardTypes")

/*
exports.handler = function(event, context) {
	console.log("hello lambda")
};

console.log('Loading function');

*/

evaluateCard = function(cards, cardId, httpData, requestId) {
    return new Promise(function(resolve, reject) {
        if (!cardId) {
            return resolve(null);
        }

        var typeInfo = cardTypes[cards[cardId].type];
        var series = new PromiseSeries();
        for (var inputLabel in typeInfo.inputs){
            inputCardId = cards[cardId].inputs[inputLabel];
            inputValue = evaluateCard(cards, inputCardId, httpData, requestId);
            series.add(inputValue);
        }
        series.run().then(function(values){
            var inputs = {};
            for (var i = 0; i < values.length; i++){
                inputs[typeInfo.inputs[i]] = values[i];
            }

            typeInfo.run(inputs, cards[cardId], httpData, requestId)
            .then(function(output) {
                return resolve(output);
            })
            .catch(function(err) {
                return resolve(null);
            })
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

        evaluateCard(cards, message.nodeId, message.data, requestId)

		context.succeed(message);
	});
};
