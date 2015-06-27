var _               = require("lodash");
var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var Card            = require("../Card/Card.jsx");


var CardLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="CardLayer">
				{_.map(this.props.graph.cards, this.renderCard)}
			</div>
		);
	},


	renderCard: function(cardData, cardId) {
		var cellWidth = this.props.grid.get("cellWidth");
		var x = (cardData.x * cellWidth) - this.props.grid.get("transX");
		var y = (cardData.y * cellWidth) - this.props.grid.get("transY");
		return (
			<Card key={cardId} cardData={cardData} x={x} y={y} width={cellWidth}/>
		);
	}

});


module.exports = CardLayer;
