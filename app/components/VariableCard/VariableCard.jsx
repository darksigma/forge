var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var VariableCard = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="VariableCard">
				<input className="Input" value={JSON.stringify(this.props.cardData.value)} onChange={this.handleInputChange}></input>
			</div>
		);
	},

	handleInputChange: function(e) {

	},

});


module.exports = VariableCard;
