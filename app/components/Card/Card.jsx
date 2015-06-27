var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


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
				</div>
			</div>
		);
	},

});


module.exports = Card;
