var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var CardOutput = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="CardOutput">
				<div className="Label">Output</div>
			</div>
		);
	},

});


module.exports = CardOutput;
