var express = require("express");
var fs      = require("fs");
var path    = require("path");
var uuid    = require("node-uuid");


var app = express();

var publicPath  = "./";
app.use(express.static(publicPath));

var renderIndex = function(req, res) {
	fs.readFile(path.join(__dirname, "assets/index.html"), "utf8", function(err, text){
		res.send(text);
	});
}

app.get("/", function(req, res) {
	res.redirect("/" + uuid.v4());
});

app.get("/:pageId", renderIndex);

app.listen(80);
