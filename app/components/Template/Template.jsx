var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var Template = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="Template">
			</div>
		);
	},

});


module.exports = Template;
