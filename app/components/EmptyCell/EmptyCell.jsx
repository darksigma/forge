var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;


var EmptyCell = React.createClass({

	mixins: [PureRenderMixin],


	render: function() {
		var rootStyle = {
			width: this.props.width + "px",
			height: this.props.width + "px",
			transform: "translate(" + this.props.x + "px," + this.props.y + "px)"
		};

		var classes = classSet({
			EmptyCell: true,
			active: this.props.active
		});

		return (
			<div className={classes} style={rootStyle}>
			</div>
		);
	},

});


module.exports = EmptyCell;
