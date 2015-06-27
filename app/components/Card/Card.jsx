var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var Card = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		return (
			<div className="Card">
			</div>
		);
	},

});


module.exports = Card;
