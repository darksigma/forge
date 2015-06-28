// dependencies
var AWS = require('aws-sdk');
var _ = require("lodash");
var Firebase = require('firebase');
var Promise = require('promise');
var globalConfig = require("./app/globalConfig");
var cardTypes = require("./app/cardTypes")

/*
exports.handler = function(event, context) {
	console.log("hello lambda")
};

console.log('Loading function');

*/

evaluateCard = function(cards, cardId, httpData, requestId) {
    console.log("evaluating! ", cardId)
    return new Promise(function(resolve, reject) {
        // if (!cardId) {
        //     return resolve(null);
        // }
        var typeInfo = cardTypes[cards[cardId].type];

        if (typeInfo.inputs.length === 0){
            typeInfo.run({}, cards[cardId], httpData, requestId)
            .then(function(output) {
                return resolve(output);
            });
        }

        var inputsComputed = _.map(typeInfo.inputs || [], function(inputLabel) {
            var inputCardId = cards[cardId].inputs[inputLabel];
            console.log("calling evaluate with ", inputCardId, " and data ", cards[inputCardId])
            return evaluateCard(cards, inputCardId, httpData, requestId);  
        });
        Promise.all(inputsComputed).then(function(values){
            var inputs = {};
            _.each(values, function(value, i) {
                inputs[typeInfo.inputs[i]] = value;
            });

            typeInfo.run(inputs, cards[cardId], httpData, requestId)
            .then(function(output) {
                return resolve(output);
            })
            .catch(function(err) {
                console.log("Error at function of cardId ", cardId, " with error ", err)
                return resolve(null);
            })
        })
        .catch(function(err) {
            console.log("Error at cardId ", cardId, " with error ", err, err.stack)
            return resolve(null);
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
        var responseCardIds = cards[message.nodeId].responseCardIds;

        evalAll = Promise.all(_.map(responseCardIds, function(responseCardId) {
            return evaluateCard(cards, responseCardId, message.data, message.requestId)
        })).then(function(){
            context.succeed(message);
        })
        .catch(function(err) {
            console.log("Error: ", err, err.stack)
        });

	});
};


// exports.handler({'Records':[{'Sns':{'Message':'{"graphId":"test-graph-nikhil","nodeId":"http-get-1","requestId":"6ac4c128-eb33-4577-b9b0-ce6700358974", "data":{}}'}}]}, null);
