var React            = require("react/addons");
var classSet         = React.addons.classSet;

var PureRenderMixin  = React.addons.PureRenderMixin;

var c                = require("../../helpers/color.js");

var cardTypes        = require("../../cardTypes");

var Link             = require("../Link/Link.jsx");


var LinkLayer = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var grid    = this.props.grid;
		var cards   = this.props.graph.cards;
		var wWidth  = grid.get("windowWidth");
		var wHeight = grid.get("windowHeight");
		var viewBox = "0 0 " + grid.get('windowWidth') + " " + grid.get('windowHeight');

		return (
			<div className="LinkLayer">
				<svg className="svg" viewBox={viewBox}>
					{this.drawSignals(cards, grid, c)}
				</svg>
			</div>
		);
	},

	drawSignals: function(cards, grid, c) {
		var signals = [];
		for(cardId in cards) { // go through cards
			var card = cards[cardId];
			if(typeof card.inputs != "undefined" && typeof cardTypes[card.type] != "undefined") {
				var i = 1;
				var inputs = cardTypes[card.type].inputs;
				for(j in inputs) { // connections
					if(typeof card.inputs[inputs[j]] != "undefined") {
						var startCard = cards[card.inputs[inputs[j]]];
						signals.push(
							<Link grid={grid}
										cards={cards}
										i={i}
										cardId={cardId}
										startCard={startCard}
										card={card}/>
						);
					}
					i++;
				}
			}
		}
		return signals;
	},

});


module.exports = LinkLayer;
