var React            = require("react/addons");
var classSet         = React.addons.classSet;

var _                = require("lodash");

var PureRenderMixin  = React.addons.PureRenderMixin;

var ReactArt         = require("react-art");
var Surface          = ReactArt.Surface;
var Group            = ReactArt.Group;
var Rectangle        = require("../../../node_modules/react-art/shapes/rectangle.js");

var c                = require("../../helpers/color.js");
var signalProperties = require("../../helpers/signalProperties.js");
var cardSizing       = require("../../helpers/cardSizing.js");
var cardTypes        = require("../../cardTypes");


var LinkLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
    var grid = this.props.grid;
		var cards = this.props.graph.cards;
    var wWidth = grid.get("windowWidth");
    var wHeight = grid.get("windowHeight");

		return (
			<div className="LinkLayer">
				{this.drawSignals(cards, grid, c)}
			</div>
		);
	},

	drawSignals: function(cards, grid, c) {
		var signals = [];
		for(key in cards) { // go through cards
			var card = cards[key];
			if(typeof card.inputs != "undefined" && typeof cardTypes[card.type] != "undefined") {
				var i = 1;
				var inputs = cardTypes[card.type].inputs;
				for(j in inputs) { // connections
					if(typeof card.inputs[inputs[j]] != "undefined") {
						var startCard = cards[card.inputs[inputs[j]]];
						var start = this.calculateStart(startCard, key, grid);
						var stop = this.calculateStop(card, i, grid);
						console.log(start);
						console.log(stop);
						var path = this.calculatePath(start, stop, card, startCard, grid);
						signals.push(this.drawSignal(grid, path, c.signal));
					}
					i++;
				}
			}
		}
		return signals
	},

	calculateStart: function(startCard, key, grid) {
		var cellSize = grid.get("cellWidth");
		var transX = grid.get("transX");
		var transY = grid.get("transY");
		var x = startCard.x*cellSize + cellSize - transX;
		var y = startCard.y*cellSize - transY + cardSizing.outputOffsetY;
		return [x, y];
	},

	calculateStop: function(card, i, grid) {
		var cellSize = grid.get("cellWidth");
		var transX = grid.get("transX");
		var transY = grid.get("transY");
		var x = card.x*cellSize - transX;
		var y = card.y*cellSize - transY + cardSizing.distToFirstInputY + cardSizing.inputSpacingY*i;
		return [x, y];
	},

	calculatePath: function(start, stop, stopCard, startCard, grid) {
		var cellSize = grid.get("cellWidth");
		var transX = grid.get("transX");
		var transY = grid.get("transY");
		var preStart = [start[0]-12, start[1]];
		var postStop = [stop[0]+12, stop[1]];
		if(stop[0] == start[0]) {
			return [preStart, start, stop, postStop];
		}
		var points = [preStart, start];
		console.log(startCard.y);
		console.log(stopCard.y);
		if(startCard.y < stopCard.y) {
			points.push([start[0], startCard.y*cellSize - transY + cellSize]);
		} else {
			points.push([start[0], startCard.y*cellSize - transY]);
		}

		// TODO recursion

		points.push(stop);
		points.push(postStop);
		console.log(points);
		return points;
	},

	// points = [[0,0],[0,1]]  <-- example
	drawSignal: function(grid, points, color) {
		var pointString = _.reduce(points, function(memo, num) {
			return memo + num[0] + " " + num[1] + " ";
		}, "M");

		var viewBox = "0 0 " + grid.get('windowWidth') + " " + grid.get('windowHeight');
		return (
			<svg className="svg" viewBox={viewBox}>
				<g>
					<path className="signal" d={pointString}></path>
				</g>
			</svg>
		);
	},

});


module.exports = LinkLayer;
