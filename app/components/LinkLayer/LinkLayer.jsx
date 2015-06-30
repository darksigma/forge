var React            = require("react/addons");
var classSet         = React.addons.classSet;

var PureRenderMixin  = React.addons.PureRenderMixin;

var _                = require("lodash");
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
										key={"input=" + inputs[j] + "_cardId=" + cardId}
										selection={this.props.selection}
										hover={this.props.hover}
										inputName={inputs[j]}
										cardId={cardId}
										startCard={startCard}
										card={card}/>
						);
					}
					i++;
				}
			}
		}

		var draggedOverComponent = this.props.drag.get("draggedOverComponent");
		if(draggedOverComponent && _.isFunction(draggedOverComponent.getVirtualLink)) {
			var info = draggedOverComponent.getVirtualLink();
			if(typeof info.inputName == "string" && info.outputCardId != info.inputCardId) {
				var startCard = this.props.graph.cards[info.outputCardId];
				var card = this.props.graph.cards[info.inputCardId];
				var i = 0;
				var k = 0;
				var inputs = cardTypes[card.type].inputs;
				for(j in inputs) {
					k++
					if(inputs[j] == info.inputName){
						i = k;
					}
				}
				signals.push(
					<Link grid={grid}
								i={i}
								key={"input=" + info.inputName + "_cardId=" + info.outputCardId}
								selection={this.props.selection}
								hover={this.props.hover}
								inputName={info.inputName}
								cardId={info.outputCardId}
								startCard={startCard}
								card={card}/>
				);
			}
		}

		return signals;
	},

});


module.exports = LinkLayer;
