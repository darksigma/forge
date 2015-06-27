var express = require('express');
var bodyParser = require('body-parser')
var AWS = require('aws-sdk'); 
var uuid = require('uuid');
var app = express();
app.use(bodyParser.json())

var sockets = {}

processLambda = function(req, res, graph_id, node_id, is_get) {
    sockets[uuid.v4()] = res;
    var sns = new AWS.SNS({params: {TopicArn: 'arn:aws:sns:us-west-2:274567149370:forge2015'}});
    var data = is_get ? req.query : req.body;

    var message = {
        graphId: graph_id,
        nodeId: node_id,
        data: data
    };

    sns.publish({Message: JSON.stringify(message)}, function (err, data) {
        if (!err) {
            console.log('Message published')
        } else {
            console.log('Kind of messed up dude...')
        }
    });
}

app.get('/:graph_id/:node_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, req.params.node_id, true);
});

app.post('/:graph_id/:node_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, req.params.node_id, false);
});,

app.put('/:graph_id/:node_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, req.params.node_id, false);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});