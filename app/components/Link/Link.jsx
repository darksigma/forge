var React           = require("react/addons");
var classSet        = React.addons.classSet;

var _                = require("lodash");

var PureRenderMixin = React.addons.PureRenderMixin;

var c                = require("../../helpers/color.js");
var signalProperties = require("../../helpers/signalProperties.js");
var cardSizing       = require("../../helpers/cardSizing.js");
var gridHelpers      = require("../../helpers/gridHelpers.js");
var cardTypes        = require("../../cardTypes");

var selectionActions = require("../../actions/selectionActions.js");
var SelectionStore   = require("../../stores/SelectionStore.js");
var hoverActions      = require("../../actions/hoverActions.js");

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
		return this.drawSignal(grid, path, card, cardId, c.signal);
	},

	drawSignal: function(grid, points, card, cardId, color) {
		var pointString = _.reduce(points, function(memo, num) {
			return memo + num[0] + " " + num[1] + " ";
		}, "M");

		var select = false;
		var selected = this.props.selection.get("selectedData");
		if(selected.get("type") == "input" && this.props.inputName == selected.get("inputName") && cardId == selected.get("cardId")) {
			select = true;
		}
		var hov = false;
		var hovered = this.props.hover.get("hoverData");
		if(hovered.get("type") == "input" && this.props.inputName == hovered.get("inputName") && cardId == hovered.get("cardId")) {
			hov = true;
		}
		var classes = classSet({
			sel: select,
			signal: true,
			hov: hov,
		});

		return (
			<g className="Link">
				<path className={classes} d={pointString} onMouseOver={this.onMouseEnter} onMouseDown={this.handleMouseDown}></path>
			</g>
		);
	},

	handleMouseDown: function() {
		selectionActions.selectLink(this.props.cardId, this.props.inputName);
	},

	onMouseEnter: function() {
		hoverActions.hoverLink(this.props.cardId, this.props.inputName);
	},

	calculateStart: function(startCard, cardId, grid) {
		var cellSize = grid.get("cellWidth");
		var x = startCard.x*cellSize + cellSize;
		var y = startCard.y*cellSize + cardSizing.outputOffsetY;
		return [x, y];
	},

	calculateStop: function(card, i, grid) {
		var cellSize = grid.get("cellWidth");
		var x = card.x*cellSize;
		var y = card.y*cellSize + cardSizing.distToFirstInputY + cardSizing.inputSpacingY*i;
		return [x, y];
	},

	calculatePath: function(start, stop, stopCard, startCard, grid) {
		var cellSize = grid.get("cellWidth");
		var preStart = [start[0]-12, start[1]];
		var postStop = [stop[0]+12, stop[1]];
		if(stop[0] == start[0]) {
			return [preStart, start, stop, postStop];
		}
		var points = [preStart, start];
		/*
		 * Go to corner:
		 * top right if below || equal
		 * bottom right if above
		 */
		if(startCard.y < stopCard.y) {
			points.push([start[0], startCard.y*cellSize + cellSize]);
		} else {
			points.push([start[0], startCard.y*cellSize]);
		}

		/*
		 * Iteration
		 */
		var mostRecentPoint = _.last(points);
		while(mostRecentPoint[0] != stop[0]) {
			if(mostRecentPoint[0] < stop[0]) {
				//go right
				points.push([mostRecentPoint[0] + cellSize, mostRecentPoint[1]]);
			} else {
				// go left
				points.push([mostRecentPoint[0] - cellSize, mostRecentPoint[1]]);
			}
			mostRecentPoint = _.last(points);
		}

		points.push(stop);
		points.push(postStop);
		return points;
	},

});

module.exports = Link;
