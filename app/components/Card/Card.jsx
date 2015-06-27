var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var cardTypes       = require("../../../cardTypes.js");
var FunctionCard    = require("../FunctionCard/FunctionCard.jsx")
var VariableCard    = require("../VariableCard/VariableCard.jsx")
var SignalIndicator = require("../SignalIndicator/SignalIndicator.jsx")


var Card = React.createClass({

	mixins: [PureRenderMixin],

	cardClassRendererMap: {
		"function": FunctionCard,
		"variable": VariableCard,
	},


	render: function() {
		var rootStyle = {
			width: this.props.width + "px",
			height: this.props.width + "px",
			transform: "translate(" + this.props.x + "px," + this.props.y + "px)"
		};

		return (
			<div className="Card" style={rootStyle}>
				<div className="CardInner">
					<div className="Header">
						<div className="Icon"></div>
						<div className="Name">{this.getCardName()}</div>
						<SignalIndicator active={true} />
					</div>
					<div className="CardUI">
						{this.renderCardClass()}
					</div>
				</div>
			</div>
		);
	},


	getCardName: function() {
		var lambdaType = cardTypes[this.props.cardData.type];
		if (lambdaType) {
			return lambdaType.humanReadableName;
		}
		else {
			return "Unknown Card";
		}
	},


	renderCardClass: function() {
		var lambdaType = cardTypes[this.props.cardData.type];
		if (lambdaType) {
			Handler = this.cardClassRendererMap[lambdaType.cardClass];

			return (
				<Handler cardData={this.props.cardData}/>
			)
		}
	},

});


module.exports = Card;
