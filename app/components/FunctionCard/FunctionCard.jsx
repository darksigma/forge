var _               = require("lodash");
var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var CardInput       = require("../CardInput/CardInput.jsx")
var CardOutput      = require("../CardOutput/CardOutput.jsx")
var cardTypes       = require("../../cardTypes.js");


var FunctionCard = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="FunctionCard">
				<div className="Inputs">{this.renderInputs()}</div>
			</div>
		);
	},

	renderInputs: function() {
		var lambdaType = cardTypes[this.props.cardData.type];
		return _.map(lambdaType.inputs, function(inputName) {
			return (
				<CardInput key={inputName} inputName={inputName} inputValue={this.props.cardData.inputs[inputName]} />
			);
		}.bind(this));
	},

});


module.exports = FunctionCard;
