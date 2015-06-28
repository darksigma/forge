var React           = require("react/addons");
var classSet        = React.addons.classSet;

var _                = require("lodash");

var PureRenderMixin = React.addons.PureRenderMixin;

var c                = require("../../helpers/color.js");
var signalProperties = require("../../helpers/signalProperties.js");
var cardSizing       = require("../../helpers/cardSizing.js");
var cardTypes        = require("../../cardTypes");


var Link = React.createClass({

	mixins: [PureRenderMixin],


	render: function(i, cardId, startCard, card) {
		var grid    = this.props.grid;
		var cards   = this.props.cards;
		var i = this.props.i;
		var cardId = this.props.cardId;
		var startCard = this.props.startCard;
		var card = this.props.card;

		var start = this.calculateStart(startCard, cardId, grid);
		var stop = this.calculateStop(card, i, grid);
		var path = this.calculatePath(start, stop, card, startCard, grid);
		return this.drawSignal(grid, path, c.signal);
	},

	drawSignal: function(grid, points, color) {
		var pointString = _.reduce(points, function(memo, num) {
			return memo + num[0] + " " + num[1] + " ";
		}, "M");

		return (
			<g className="Link">
				<path className="signal" d={pointString}></path>
			</g>
		);
	},

	calculateStart: function(startCard, cardId, grid) {
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
		if(startCard.y < stopCard.y) {
			points.push([start[0], startCard.y*cellSize - transY + cellSize]);
		} else {
			points.push([start[0], startCard.y*cellSize - transY]);
		}

		var mostRecentPoint = points[points.length-1];
		while(mostRecentPoint[0] != stop[0]) {
			if(mostRecentPoint[0] < stop[0]) {
				//go right
				points.push([mostRecentPoint[0] + cellSize, mostRecentPoint[1]]);
			} else {
				// go left
				points.push([mostRecentPoint[0] - cellSize, mostRecentPoint[1]]);
			}
			mostRecentPoint = points[points.length-1];
		}

		points.push(stop);
		points.push(postStop);
		return points;
	},

});

module.exports = Link;
