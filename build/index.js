(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFormsAutocomplete = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function () {
			return classNames;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}

}());

},{}],2:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var Input = _react2["default"].createClass({
	displayName: "Input",

	propTypes: {
		onChange: _react2["default"].PropTypes.func,
		onInvalid: _react2["default"].PropTypes.func,
		onKeyDown: _react2["default"].PropTypes.func,
		onKeyUp: _react2["default"].PropTypes.func,
		placeholder: _react2["default"].PropTypes.string,
		style: _react2["default"].PropTypes.object,
		valid: _react2["default"].PropTypes.bool,
		validate: _react2["default"].PropTypes.func,
		value: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			value: ""
		};
	},

	getInitialState: function getInitialState() {
		return {
			focus: false,
			valid: true
		};
	},

	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (this.props.value === nextProps.value) {
			return;
		}

		if (nextProps.value === "") {
			if (!this.state.valid) {
				this.setState({ valid: true });
			}

			return;
		}

		if (this.props.validate) {
			var valid = this.props.validate(nextProps.value);

			this.setState({ valid: valid });

			if (!valid && this.props.onInvalid) {
				this.props.onInvalid(nextProps.value);
			}
		}
	},

	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		var propsValueChange = this.props.value !== nextProps.value;
		var stateFocusChange = this.state.focus !== nextState.focus;

		return propsValueChange || stateFocusChange;
	},

	toggleFocus: function toggleFocus() {
		this.setState({ focus: !this.state.focus });
	},

	handleKeyDown: function handleKeyDown(ev) {
		if (this.props.onKeyDown) {
			this.props.onKeyDown(ev);
		}
	},

	handleKeyUp: function handleKeyUp(ev) {
		if (this.props.onKeyUp) {
			this.props.onKeyUp(ev);
		}
	},

	handleChange: function handleChange(ev) {
		this.props.onChange(ev.currentTarget.value, ev);
	},

	render: function render() {
		return _react2["default"].createElement("input", {
			className: (0, _classnames2["default"])("hire-input", { invalid: !this.state.valid }),
			onBlur: this.toggleFocus,
			onChange: this.handleChange,
			onFocus: this.toggleFocus,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp,
			placeholder: this.props.placeholder,
			style: this.props.style,
			value: this.props.value });
	}
});

exports["default"] = Input;
module.exports = exports["default"];

},{"classnames":1,"react":"react"}],3:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var keyValueMap = _react2["default"].PropTypes.shape({
	key: _react2["default"].PropTypes.string.isRequired,
	value: _react2["default"].PropTypes.string.isRequired
});

exports.keyValueMap = keyValueMap;
// ARRAY OF

var arrayOfKeyValueMaps = _react2["default"].PropTypes.arrayOf(keyValueMap);

exports.arrayOfKeyValueMaps = arrayOfKeyValueMaps;
var arrayOfStrings = _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string);

exports.arrayOfStrings = arrayOfStrings;
var arrayOfElements = _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.element);

exports.arrayOfElements = arrayOfElements;
// OR

var stringOrArray = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.array]);

exports.stringOrArray = stringOrArray;
var stringOrKeyValueMap = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, keyValueMap]);

exports.stringOrKeyValueMap = stringOrKeyValueMap;
var stringOrArrayOfStrings = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, arrayOfStrings]);

exports.stringOrArrayOfStrings = stringOrArrayOfStrings;
var elementOrArrayOfElement = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.element, arrayOfElements]);

exports.elementOrArrayOfElement = elementOrArrayOfElement;
var arrayOfStringsOrArrayOfKeyValueMaps = _react2["default"].PropTypes.oneOfType([arrayOfStrings, arrayOfKeyValueMaps]);

exports.arrayOfStringsOrArrayOfKeyValueMaps = arrayOfStringsOrArrayOfKeyValueMaps;
var keyValueMapOrArrayOfKeyValueMaps = _react2["default"].PropTypes.oneOfType([keyValueMap, arrayOfKeyValueMaps]);
exports.keyValueMapOrArrayOfKeyValueMaps = keyValueMapOrArrayOfKeyValueMaps;

},{"react":"react"}],4:[function(_dereq_,module,exports){

/*
 * @param {Array} list
 * @returns {Boolean}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isListOfStrings = isListOfStrings;
exports.isKeyValueMap = isKeyValueMap;
exports.castArray = castArray;
exports.castKeyValueArray = castKeyValueArray;

function isListOfStrings(list) {
	if (!Array.isArray(list) || !list.length) {
		return false;
	}

	return list.every(function (item) {
		return typeof item === "string";
	});
}

/*
 * @param {Object} map
 * @returns {Boolean}
 */

function isKeyValueMap(map) {
	if (map == null) {
		return false;
	}

	return map.hasOwnProperty("key") && map.hasOwnProperty("value");
}

/*
 * Always return an array.
 *
 * @param {String|Array} arr
 * @returns {Array}
 */

function castArray(arr) {
	return Array.isArray(arr) ? arr : [arr];
}

;

/*
 * Always return an array of key/value maps.
 *
 * @param {Number|String|Boolean|Array} list
 * @returns {Array} Array of key value maps, ie: [{key: "A", value: "A"}, {key: "B", value: "B"}, ...]
 */

function castKeyValueArray(list) {
	list = castArray(list);

	return list.map(function (item) {
		return isKeyValueMap(item) ? item : {
			key: item,
			value: item
		};
	});
}

},{}],5:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _hireFormsInput = _dereq_("hire-forms-input");

var _hireFormsInput2 = _interopRequireDefault(_hireFormsInput);

var _hireFormsOptions = _dereq_("hire-forms-options");

var _hireFormsOptions2 = _interopRequireDefault(_hireFormsOptions);

var _hireFormsPropTypes = _dereq_("hire-forms-prop-types");

var _hireFormsUtils = _dereq_("hire-forms-utils");

var Autocomplete = (function (_React$Component) {
	function Autocomplete(props) {
		_classCallCheck(this, Autocomplete);

		_get(Object.getPrototypeOf(Autocomplete.prototype), "constructor", this).call(this, props);

		this.cache = {};

		this.state = {
			options: [],
			query: props.value.value
		};
	}

	_inherits(Autocomplete, _React$Component);

	_createClass(Autocomplete, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				query: nextProps.value.value,
				options: []
			});
		}
	}, {
		key: "handleInputChange",
		value: function handleInputChange(inputValue) {
			// Return empty options if inputValue length is beneath a treshold.
			if (inputValue.length < this.props.minLength) {
				return this.setState({
					query: inputValue,
					options: []
				});
			}

			// Return cache if inputValue is found in the cache.
			if (this.cache.hasOwnProperty(inputValue)) {
				return this.setState({
					query: inputValue,
					options: this.cache[inputValue]
				});
			}

			if (this.props.async == null) {
				this.filter(inputValue);
			} else {
				this.filterAsync(inputValue);
			}
		}
	}, {
		key: "filterAsync",
		value: function filterAsync(inputValue) {
			this.setState({ "query": inputValue });

			var done = function done(response) {
				// Add the options to the cache.
				this.cache[inputValue] = response;

				// Get the cache from the current (!!!) inputValue. The results trail behind
				// the user typing, so we have to pass the options of the current inputValue,
				// not the options of the inputValue of the fetch.
				var state = this.cache.hasOwnProperty(this.state.query) ? { options: this.cache[this.state.query] } : { options: [] };

				this.setState(state);
			};

			this.props.async(inputValue, done.bind(this));
		}
	}, {
		key: "filter",
		value: function filter(inputValue) {
			this.cache[inputValue] = inputValue === "" ? [] : this.props.options.filter(function (value) {
				if ((0, _hireFormsUtils.isKeyValueMap)(value)) {
					value = value.value;
				}

				return value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
			});

			this.setState({
				query: inputValue,
				options: this.cache[inputValue]
			});
		}
	}, {
		key: "handleInputKeyDown",
		value: function handleInputKeyDown(ev) {
			// Escape
			if (ev.keyCode === 27) {
				this.setState({
					options: [],
					query: ""
				});
			}

			if (this.refs.options == null) {
				return;
			}

			// Up
			if (ev.keyCode === 38) {
				this.refs.options.highlightPrev();
			}

			// Down
			if (ev.keyCode === 40) {
				this.refs.options.highlightNext();
			}

			// Enter
			if (ev.keyCode === 13) {
				this.refs.options.select();
			}
		}
	}, {
		key: "handleOptionsChange",

		/*
   * @param {Object} value Key/value map, ie: {key: "A", value: "A"}
   */
		value: function handleOptionsChange(value) {
			this.props.onChange(value);
		}
	}, {
		key: "render",
		value: function render() {
			var options = this.state.options.length !== 0 ? _react2["default"].createElement(_hireFormsOptions2["default"], {
				onChange: this.handleOptionsChange.bind(this),
				query: this.state.query,
				ref: "options",
				value: this.props.value,
				values: (0, _hireFormsUtils.castKeyValueArray)(this.state.options) }) : null;

			return _react2["default"].createElement(
				"div",
				{
					className: "hire-forms-autocomplete",
					style: { position: "relative" } },
				_react2["default"].createElement(_hireFormsInput2["default"], {
					onChange: this.handleInputChange.bind(this),
					onKeyDown: this.handleInputKeyDown.bind(this),
					placeholder: this.props.placeholder,
					ref: "input",
					value: this.state.query }),
				this.props.children,
				options
			);
		}
	}]);

	return Autocomplete;
})(_react2["default"].Component);

Autocomplete.propTypes = {
	async: _react2["default"].PropTypes.func,
	children: _react2["default"].PropTypes.element,
	minLength: _react2["default"].PropTypes.number,
	onChange: _react2["default"].PropTypes.func,
	options: _hireFormsPropTypes.arrayOfKeyValueMaps,
	placeholder: _react2["default"].PropTypes.string,
	value: _hireFormsPropTypes.keyValueMap
};

Autocomplete.defaultProps = {
	minLength: 1,
	value: {
		key: "",
		value: ""
	}
};

exports["default"] = Autocomplete;
module.exports = exports["default"];

},{"hire-forms-input":2,"hire-forms-options":6,"hire-forms-prop-types":3,"hire-forms-utils":4,"react":"react"}],6:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFormsOptions = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var keyValueMap = _react2["default"].PropTypes.shape({
	key: _react2["default"].PropTypes.string.isRequired,
	value: _react2["default"].PropTypes.string.isRequired
});

exports.keyValueMap = keyValueMap;
// ARRAY OF

var arrayOfKeyValueMaps = _react2["default"].PropTypes.arrayOf(keyValueMap);

exports.arrayOfKeyValueMaps = arrayOfKeyValueMaps;
var arrayOfStrings = _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string);

exports.arrayOfStrings = arrayOfStrings;
var arrayOfElements = _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.element);

exports.arrayOfElements = arrayOfElements;
// OR

var stringOrArray = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.array]);

exports.stringOrArray = stringOrArray;
var stringOrKeyValueMap = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, keyValueMap]);

exports.stringOrKeyValueMap = stringOrKeyValueMap;
var stringOrArrayOfStrings = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, arrayOfStrings]);

exports.stringOrArrayOfStrings = stringOrArrayOfStrings;
var elementOrArrayOfElement = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.element, arrayOfElements]);

exports.elementOrArrayOfElement = elementOrArrayOfElement;
var arrayOfStringsOrArrayOfKeyValueMaps = _react2["default"].PropTypes.oneOfType([arrayOfStrings, arrayOfKeyValueMaps]);

exports.arrayOfStringsOrArrayOfKeyValueMaps = arrayOfStringsOrArrayOfKeyValueMaps;
var keyValueMapOrArrayOfKeyValueMaps = _react2["default"].PropTypes.oneOfType([keyValueMap, arrayOfKeyValueMaps]);
exports.keyValueMapOrArrayOfKeyValueMaps = keyValueMapOrArrayOfKeyValueMaps;

},{"react":"react"}],2:[function(_dereq_,module,exports){

/*
 * @param {Array} list
 * @returns {Boolean}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isListOfStrings = isListOfStrings;
exports.isKeyValueMap = isKeyValueMap;
exports.castArray = castArray;
exports.castKeyValue = castKeyValue;
exports.castKeyValueArray = castKeyValueArray;

function isListOfStrings(list) {
  if (!Array.isArray(list) || !list.length) {
    return false;
  }

  return list.every(function (item) {
    return typeof item === "string";
  });
}

/*
 * @param {Object} map
 * @returns {Boolean}
 */

function isKeyValueMap(map) {
  if (map == null) {
    return false;
  }

  return map.hasOwnProperty("key") && map.hasOwnProperty("value");
}

/*
 * Always return an array.
 *
 * @param {String|Array} arr
 * @returns {Array}
 */

function castArray(arr) {
  return Array.isArray(arr) ? arr : [arr];
}

;

/*
 * Always return a key/value map.
 *
 * @param {Number|String|Boolean|Object} item
 * @returns {Array} Array of key value maps, ie: [{key: "A", value: "A"}, {key: "B", value: "B"}, ...]
 */

function castKeyValue(item) {
  return isKeyValueMap(item) ? item : {
    key: item,
    value: item
  };
}

/*
 * Always return an array of key/value maps.
 *
 * @param {Number|String|Boolean|Array|Object} list
 * @returns {Array} Array of key value maps, ie: [{key: "A", value: "A"}, {key: "B", value: "B"}, ...]
 */

function castKeyValueArray(list) {
  list = castArray(list);

  return list.map(castKeyValue);
}

},{}],3:[function(_dereq_,module,exports){
// TODO move listitem to seperate component (so we don't have to store data-key and data-value as attributes)
// Move util functions to seperate module

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _hireFormsPropTypes = _dereq_("hire-forms-prop-types");

var _hireFormsUtils = _dereq_("hire-forms-utils");

var hasKeyValue = function hasKeyValue(list, item) {
	return list.filter(function (li) {
		return li.key === item.key;
	}).length > 0;
};

/**
 * Options are rendered beneath the autocomplete and select components.
 *
 * @class
 * @extends React.Component
 */

var Options = (function (_React$Component) {
	_inherits(Options, _React$Component);

	function Options() {
		_classCallCheck(this, Options);

		_get(Object.getPrototypeOf(Options.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Options, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var node = _react2["default"].findDOMNode(this);

			if (node) {
				node.style.zIndex = 1000;
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var node = _react2["default"].findDOMNode(this);
			node.style.zIndex = 0;
		}

		/**
   * Sort values on relevance. A result is more relevant when the search
   * query is more at the beginning of the string. In other words:
   * String.indexOf(props.query): lower is better.
   * @param {Array<Object>} value An array of key/value maps
   * @param {String} query A search query
   * @returns {Array<Object>} Sorted values on relevance
   */
	}, {
		key: "sortRelevance",
		value: function sortRelevance(values, query) {
			return values.sort(function (a, b) {
				a = a.value.toLowerCase();
				b = b.value.toLowerCase();

				var indexA = a.indexOf(query);
				var indexB = b.indexOf(query);

				if (indexA > indexB) {
					return 1;
				}

				if (indexA < indexB) {
					return -1;
				}

				if (indexA === indexB) {
					if (a > b) {
						return 1;
					}

					if (a < b) {
						return -1;
					}
				}

				return 0;
			});
		}

		/*
   * highlight the currently highlighted option.
   *
   * @param {Object} target An HTMLElement or event object
   * @param {String} className Name of the highlight class
   */
	}, {
		key: "highlight",
		value: function highlight(target, className) {
			// Check if target is an event object.
			if (target.hasOwnProperty("currentTarget")) {
				target = target.currentTarget;
			}

			target.classList.add(className);
		}

		/**
   * Unhighlight the currently highlighted option.
   *
   * @param {String} className Name of the highlight class
   * @return {Object} The unhighlighted HTMLElement
   */
	}, {
		key: "unhighlight",
		value: function unhighlight(className) {
			var el = undefined;
			var node = _react2["default"].findDOMNode(this);

			if (node) {
				el = node.querySelector("li." + className);

				if (el) {
					el.classList.remove(className);
				}
			}

			return el;
		}
	}, {
		key: "handleClick",
		value: function handleClick(ev) {
			this.props.onChange(this.getOptionData(ev.currentTarget));
		}
	}, {
		key: "highlightPrev",
		value: function highlightPrev() {
			var prev = undefined;
			var current = this.unhighlight(this.props.highlightClass);

			if (current) {
				prev = current.previousElementSibling;
			}

			// If current and prev aren't found, start at the top.
			// Current is not found if there is no list item highlighted.
			// Prev is not found if the first list item is highlighted.
			if (!prev) {
				prev = _react2["default"].findDOMNode(this).lastChild;
			}

			this.highlight(prev, this.props.highlightClass);
		}
	}, {
		key: "highlightNext",
		value: function highlightNext() {
			var next = undefined;
			var current = this.unhighlight(this.props.highlightClass);

			if (current) {
				next = current.nextElementSibling;
			}

			// If current and next aren't found, start at the top.
			// Current is not found if there is no list item highlighted.
			// Next is not found if the last list item is highlighted.
			if (!next) {
				next = _react2["default"].findDOMNode(this).firstChild;
			}

			this.highlight(next, this.props.highlightClass);
		}
	}, {
		key: "select",
		value: function select() {
			var current = this.unhighlight(this.props.highlightClass);

			if (current) {
				this.props.onChange(this.getOptionData(current));
			}
		}

		/**
   * Get the key (id) and value (display name) of an option DOM element.
   *
   * @param {Object} el - Option DOM element
   * @returns {Object}
   */
	}, {
		key: "getOptionData",
		value: function getOptionData(el) {
			return {
				key: el.getAttribute("data-key"),
				value: el.getAttribute("data-value")
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _this = this;

			if (this.props.values.length === 0) {
				return null;
			}

			var values = this.props.sort || this.props.sortRelevance && this.props.query !== "" ? this.sortRelevance(this.props.values, this.props.querySelector) : this.props.values;

			var listitems = values.map(function (data, index) {
				var displayValue = data.value;

				if (_this.props.query.length) {
					var re = new RegExp(_this.props.query, "ig");
					displayValue = data.value.replace(re, "<span class=\"highlight\">$&</span>");
				}

				return _react2["default"].createElement("li", {
					className: (0, _classnames2["default"])({
						"hire-forms-option": true,
						selected: hasKeyValue((0, _hireFormsUtils.castArray)(_this.props.value), data)
					}),
					dangerouslySetInnerHTML: { __html: displayValue },
					"data-key": data.key,
					"data-value": data.value,
					key: index,
					onClick: _this.handleClick.bind(_this) });
			});

			return _react2["default"].createElement(
				"ul",
				{
					className: "hire-options" },
				listitems
			);
		}
	}]);

	return Options;
})(_react2["default"].Component);

Options.defaultProps = {
	highlightClass: "highlight",
	query: "",
	sort: false,
	sortRelevance: true,
	value: { key: "", value: "" },
	values: []
};

Options.propTypes = {
	highlightClass: _react2["default"].PropTypes.string,
	onChange: _react2["default"].PropTypes.func.isRequired,
	query: _react2["default"].PropTypes.string,
	sort: _react2["default"].PropTypes.bool,
	sortRelevance: _react2["default"].PropTypes.bool,
	value: _hireFormsPropTypes.keyValueMapOrArrayOfKeyValueMaps,
	values: _hireFormsPropTypes.arrayOfKeyValueMaps
};

exports["default"] = Options;
module.exports = exports["default"];

},{"classnames":"classnames","hire-forms-prop-types":1,"hire-forms-utils":2,"react":"react"}]},{},[3])(3)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":7,"hire-forms-prop-types":8,"hire-forms-utils":9,"react":"react"}],7:[function(_dereq_,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd){
		// AMD. Register as an anonymous module.
		define(function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}

}());

},{}],8:[function(_dereq_,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3,"react":"react"}],9:[function(_dereq_,module,exports){

/*
 * @param {Array} list
 * @returns {Boolean}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isListOfStrings = isListOfStrings;
exports.isKeyValueMap = isKeyValueMap;
exports.castArray = castArray;
exports.castKeyValue = castKeyValue;
exports.castKeyValueArray = castKeyValueArray;

function isListOfStrings(list) {
  if (!Array.isArray(list) || !list.length) {
    return false;
  }

  return list.every(function (item) {
    return typeof item === "string";
  });
}

/*
 * @param {Object} map
 * @returns {Boolean}
 */

function isKeyValueMap(map) {
  if (map == null) {
    return false;
  }

  return map.hasOwnProperty("key") && map.hasOwnProperty("value");
}

/*
 * Always return an array.
 *
 * @param {String|Array} arr
 * @returns {Array}
 */

function castArray(arr) {
  return Array.isArray(arr) ? arr : [arr];
}

;

/*
 * Always return a key/value map.
 *
 * @param {Number|String|Boolean|Object} item
 * @returns {Array} Array of key value maps, ie: [{key: "A", value: "A"}, {key: "B", value: "B"}, ...]
 */

function castKeyValue(item) {
  return isKeyValueMap(item) ? item : {
    key: item,
    value: item
  };
}

/*
 * Always return an array of key/value maps.
 *
 * @param {Number|String|Boolean|Array|Object} list
 * @returns {Array} Array of key value maps, ie: [{key: "A", value: "A"}, {key: "B", value: "B"}, ...]
 */

function castKeyValueArray(list) {
  list = castArray(list);

  return list.map(castKeyValue);
}

},{}]},{},[5])(5)
});
