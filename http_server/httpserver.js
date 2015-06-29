var express = require('express');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk'); 
var uuid = require('uuid');
var app = express();
app.use(bodyParser.json())

var sockets = {}

processLambda = function(req, res, graph_id, is_get) {
    request_id = uuid.v4();
    sockets[request_id] = res;
    AWS.config.region = 'us-west-2';
    var sns = new AWS.SNS({params: {TopicArn: 'arn:aws:sns:us-west-2:274567149370:forge2015'}});
    var data = is_get ? req.query : req.body;
    console.log("req.query: ", req.query)
    console.log("req.body: ", req.body)
    console.log("data: ", data)
    var message = {
        'requestId': request_id,
        'graphId': graph_id,
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
    console.log("received data ", JSON.stringify(req.body));

    var foundSocket = sockets[req.params.request_id];
    if (foundSocket) {
        foundSocket.send(JSON.stringify(req.body));
    }

    delete sockets[req.params.request_id]
    res.sendStatus(200)
});

app.get('/trigger/:graph_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, true);
});

app.post('/trigger/:graph_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, false);
});

app.put('/trigger/:graph_id', function (req, res) {
    processLambda(req, res, req.params.graph_id, false);
});

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Forge HTTP server listening at http://%s:%s', host, port);

});