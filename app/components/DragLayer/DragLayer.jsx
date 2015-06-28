var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var Card            = require("../Card/Card.jsx");


var DragLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="DragLayer">
				{this.renderDraggingCard()}
			</div>
		);
	},

	renderDraggingCard: function() {
		var cardId = this.props.drag.get("cardId");

		if (cardId) {
			var cardData  = this.props.graph.cards[cardId]
			var x         = this.props.drag.get("startX") + this.props.drag.get("offsetX");
			var y         = this.props.drag.get("startY") + this.props.drag.get("offsetY");
			var cellWidth = this.props.grid.get("cellWidth");

			return (
				<Card
					key={cardId}
					cardId={cardId}
					cardData={cardData}
					x={x}
					y={y}
					width={cellWidth}
					selected={true}
					graph={this.props.graph} />
			);
		}
	}

});


module.exports = DragLayer;
