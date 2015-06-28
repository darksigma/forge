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
		var dragData = this.props.drag.get("dragData");

		if (dragData && dragData.get("type") === "card") {
			var cardId    = dragData.get("cardId");
			var cardData  = this.props.graph.cards[cardId];
			var x         = this.props.drag.get("startX") + this.props.drag.get("offsetX") - (this.props.grid.get("cellWidth") / 2);
			var y         = this.props.drag.get("startY") + this.props.drag.get("offsetY") - (this.props.grid.get("cellWidth") / 2);
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
