var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var EmptyCell = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="EmptyCell">
			</div>
		);
	},

});


module.exports = EmptyCell;
