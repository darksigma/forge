var _                = require("lodash");
var React            = require("react/addons");
var classSet         = React.addons.classSet;
var PureRenderMixin  = React.addons.PureRenderMixin;
var Card             = require("../Card/Card.jsx");
var selectionActions = require("../../actions/selectionActions.js");


var CardLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="CardLayer">
				<div className="Background" onMouseDown={this.handleBackgroundMouseDown}></div>
				<div className="Cards">
					{_.map(this.props.graph.cards, this.renderCard)}
				</div>
			</div>
		);
	},


	renderCard: function(cardData, cardId) {
		var cellWidth = this.props.grid.get("cellWidth");
		var x = (cardData.x * cellWidth) - this.props.grid.get("transX");
		var y = (cardData.y * cellWidth) - this.props.grid.get("transY");

		isSelected = this.props.selection.get("selectedCard") === cardId;

		return (
			<Card key={cardId} cardId={cardId} cardData={cardData} x={x} y={y} width={cellWidth} selected={isSelected}/>
		);
	},


	/*
		Events
	*/

	handleBackgroundMouseDown: function() {
		selectionActions.clearSelection();
	},

});


module.exports = CardLayer;
