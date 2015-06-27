var React    = require("react/addons");
var _        = require("lodash");
var Velocity = require("velocity-animate");


module.exports = function(options) {
	var inProps = _.clone(options.in);
	var inEasing = options.in.easing;
	var inDuration = options.in.duration;
	delete inProps.easing;
	delete inProps.duration;

	var outProps = _.clone(options.out);
	var outEasing = options.out.easing;
	var outDuration = options.out.duration;
	delete outProps.easing;
	delete outProps.duration;

	return {

		componentWillAppear: function(callback) {
			this.componentWillEnter(callback);
		},


		componentDidAppear: function() {
			this.componentDidEnter();
		},


		componentWillEnter: function(callback) {
			Velocity(React.findDOMNode(this), inProps, {
				complete: callback,
				easing: inEasing,
				duration: inDuration,
			});
		},


		componentWillLeave: function(callback) {
			Velocity(React.findDOMNode(this), outProps, {
				complete: callback,
				easing: outEasing,
				duration: outDuration,
			});
		}

	};

};
