// dependencies
var AWS = require('aws-sdk');
var _ = require("lodash");
var Firebase = require('firebase');
var Promise = require('promise');
var globalConfig = require("./app/globalConfig");
var cardTypes = require("./app/cardTypes")


var runCardFn = function(typeInfo, inputs, cardData, httpData, requestID) {
    return new Promise(function(resolve, reject) {
        console.log("\n===============================================>>");
        console.log("RUNNING LAMBDA: ", typeInfo.humanReadableName);
        console.log("inputs: ", inputs);
        console.log("cardData: ", cardData);
        console.log("httpData: ", httpData);
        console.log("requestID: ", requestID);

        typeInfo.run(inputs, cardData, httpData, requestID)
        .then(function(output) {
            console.log("\n<<===============================================");
            console.log("RAN LAMBDA: ", typeInfo.humanReadableName);
            console.log("inputs: ", inputs);
            console.log("cardData: ", cardData);
            console.log("httpData: ", httpData);
            console.log("requestID: ", requestID);
            console.log("output: ", output);

            return resolve(output);
        })
        .catch(function(err) {
            console.log("lambda threw error: ", typeInfo.humanReadableName, err, err.stack);
        });
    });
};


var evaluateCard = function(cards, cardId, httpData, requestId) {
    return new Promise(function(resolve, reject) {
        var typeInfo = cardTypes[cards[cardId].type];

        if (typeInfo.inputs.length === 0){
            runCardFn(typeInfo, {}, cards[cardId], httpData, requestId)
            .then(function(output) {
                return resolve(output);
            });
        }

        var inputsComputed = _.map(typeInfo.inputs || [], function(inputLabel) {
            var inputCardId = cards[cardId].inputs[inputLabel];
            return evaluateCard(cards, inputCardId, httpData, requestId);  
        });
        Promise.all(inputsComputed).then(function(values){
            var inputs = {};
            _.each(values, function(value, i) {
                inputs[typeInfo.inputs[i]] = value;
            });

            runCardFn(typeInfo, inputs, cards[cardId], httpData, requestId)
            .then(function(output) {
                return resolve(output);
            })
            .catch(function(err) {
                return resolve(null);
            })
        })
        .catch(function(err) {
            return resolve(null);
        })
    });
}

exports.handler = function(event, context) {
    var message = JSON.parse(event.Records[0].Sns.Message);
    var graph_id = message.graphId;
    var root = new Firebase(globalConfig.firebaseUrl);
    root.child("graphs").child(graph_id).once('value', function(snap) {
        var graphData = snap.val();
        var cards = graphData.cards;

        cardIds = Object.keys(cards);
        var responseCardIds = _.filter(cardIds, function(cardId, index){
            return cards[cardId].type === "httpResponse";
        });


        evalAll = Promise.all(_.map(responseCardIds, function(responseCardId) {
            return evaluateCard(cards, responseCardId, message.data, message.requestId)
        })).then(function(){
            context.succeed(message);
        })
        .catch(function(err) {
        });

	});
};


// exports.handler({'Records':[{'Sns':{'Message':'{"graphId":"user-popular-tweets","nodeId":"-JsusLyBgt_0VdWK3Osz","requestId":"cb443e33-5029-4ca7-8f74-340a302ac955", "data":{"user":"xyz", "numTweets": 10}}'}}]}, null);
