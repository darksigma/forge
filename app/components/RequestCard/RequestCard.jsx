var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var globalConfig    = require("../../globalConfig.js");


var RequestCard = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="RequestCard">
			</div>
		);
	},


	requestUrl: function() {
		return globalConfig.httpServerUrl + this.props.graph.graphId + "/"  + this.props.cardId
	},

});


module.exports = RequestCard;
