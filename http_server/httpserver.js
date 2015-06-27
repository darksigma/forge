var express = require('express');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk'); 
var uuid = require('uuid');
var app = express();
app.use(bodyParser.json())

var sockets = {}

processLambda = function(req, res, graph_id, node_id, is_get) {
    request_id = uuid.v4();
    sockets[request_id] = res;
    AWS.config.region = 'us-west-2';
    var sns = new AWS.SNS({params: {TopicArn: 'arn:aws:sns:us-west-2:274567149370:forge2015'}});
    var data = is_get ? req.query : req.body;

    var message = {
        'request_id': request_id,
        'graphId': graph_id,
        'nodeId': node_id,
        'data': data
    };
    sns.publish({Message: JSON.stringify(message)}, function (err, data) {
        if (!err) {
            console.log('Message published')
            console.log(message);
        } else {
            console.log('Kind of messed up dude...')
            console.log(err)
        }
    });
}

app.post('/complete/:request_id', function(req, res) {
    console.log("removing " + req.params.request_id)
    sockets[req.params.request_id].send(JSON.stringify(req.body));
    delete sockets[req.params.request_id]
    res.sendStatus(200)
});

app.get('/trigger/:graph_id/:node_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, req.params.node_id, true);
});

app.post('/trigger/:graph_id/:node_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, req.params.node_id, false);
});

app.put('/trigger/:graph_id/:node_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, req.params.node_id, false);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});