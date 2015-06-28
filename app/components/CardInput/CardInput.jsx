var React           = require("react/addons");
var classSet        = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;
var SignalIndicator = require("../SignalIndicator/SignalIndicator.jsx");
var Droppable       = require("../../mixins/Droppable.jsx");


var CardInput = React.createClass({

	mixins: [PureRenderMixin, Droppable],


	render: function() {
		var active = false;
		if (this.props.inputValue) {
			active = true;
		}

		return (
			<div className="CardInput">
				<SignalIndicator active={active} />
				<div className="Label">
					{this.props.inputName}
				</div>
			</div>
		);
	},

});


module.exports = CardInput;
