var _                 = require("lodash");
var Reflux            = require("reflux");
var Immutable         = require("Immutable");
var React             = require("react/addons");
var classSet          = React.addons.classSet;
var PureRenderMixin   = React.addons.PureRenderMixin;
var cardTypes         = require("../../cardTypes.js");
var AddCardMenuOption = require("../AddCardMenuOption/AddCardMenuOption.jsx")


var AddCardMenu = React.createClass({

	mixins: [PureRenderMixin],

	render: function() {
		return (
			<div className="AddCardMenu">
				<div className="Inner">
					{this.renderOptions()}
				</div>
			</div>
		);
	},


	renderOptions: function() {
		return _.map(cardTypes, function(cardTypeData, cardTypeName) {
			return (
				<AddCardMenuOption
					cardTypeData={cardTypeData}
					cardTypeName={cardTypeName}
					coordinate={this.props.coordinate} />
			);
		}.bind(this));
	},

});


module.exports = AddCardMenu;
