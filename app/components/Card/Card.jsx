var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var lambdaTypes     = require("../../../lambdaTypes.js");


var Card = React.createClass({

	mixins: [PureRenderMixin],


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
					</div>
				</div>
			</div>
		);
	},


	getCardName: function() {
		var lambdaType = lambdaTypes[this.props.cardData.type];
		if (lambdaType) {
			return lambdaType.name;
		}
		else {
			return "Unknown Card";
		}
	},

});


module.exports = Card;
