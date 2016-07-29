(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFormsAutocomplete = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFormsInput = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var Input = (function (_React$Component) {
	_inherits(Input, _React$Component);

	function Input(props) {
		_classCallCheck(this, Input);

		_get(Object.getPrototypeOf(Input.prototype), "constructor", this).call(this, props);

		this.state = {
			valid: true,
			invalidMessage: null
		};
	}

	_createClass(Input, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.value === nextProps.value) {
				return;
			}

			if (nextProps.value === "") {
				if (!this.state.valid) {
					this.setState({
						valid: true,
						invalidMessage: null
					});
				}

				return;
			} else if (this.props.validate) {
				var validator = this.props.validate(nextProps.value);

				this.setState({
					valid: validator.isValid,
					invalidMessage: validator.message
				});

				if (!validator.isValid && this.props.onInvalid) {
					this.props.onInvalid(validator.message, nextProps.value);
				}
			}
		}
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.props.value !== nextProps.value;
		}
	}, {
		key: "handleChange",
		value: function handleChange(ev) {
			this.props.onChange(ev.currentTarget.value, ev);
		}
	}, {
		key: "render",
		value: function render() {
			var invalidMessage = this.state.invalidMessage ? _react2["default"].createElement(
				"div",
				{ className: "hire-forms-invalid-message" },
				this.state.invalidMessage
			) : null;

			return _react2["default"].createElement(
				"div",
				{
					className: (0, _classnames2["default"])("hire-input", { invalid: !this.state.valid }) },
				_react2["default"].createElement("input", {
					onBlur: this.props.onBlur,
					onChange: this.handleChange.bind(this),
					onFocus: this.props.onFocus,
					onKeyDown: this.props.onKeyDown,
					onKeyUp: this.props.onKeyUp,
					placeholder: this.props.placeholder,
					style: this.props.style,
					value: this.props.value }),
				invalidMessage
			);
		}
	}]);

	return Input;
})(_react2["default"].Component);

Input.propTypes = {
	onBlur: _react2["default"].PropTypes.func,
	onChange: _react2["default"].PropTypes.func.isRequired,
	onFocus: _react2["default"].PropTypes.func,
	onInvalid: _react2["default"].PropTypes.func,
	onKeyDown: _react2["default"].PropTypes.func,
	onKeyUp: _react2["default"].PropTypes.func,
	placeholder: _react2["default"].PropTypes.string,
	style: _react2["default"].PropTypes.object,
	valid: _react2["default"].PropTypes.bool,
	validate: _react2["default"].PropTypes.func,
	value: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.number])
};

Input.defaultProps = {
	value: ""
};

exports["default"] = Input;
module.exports = exports["default"];

},{"classnames":"classnames","react":"react"}]},{},[1])(1)
});
},{}],2:[function(_dereq_,module,exports){
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

},{"react":"react"}],3:[function(_dereq_,module,exports){

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

},{}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_('react');

var _react2 = _interopRequireDefault(_react);

var _hireFormsInput = _dereq_('hire-forms-input');

var _hireFormsInput2 = _interopRequireDefault(_hireFormsInput);

var _hireFormsOptions = _dereq_('hire-forms-options');

var _hireFormsOptions2 = _interopRequireDefault(_hireFormsOptions);

var _hireFormsPropTypes = _dereq_('hire-forms-prop-types');

var _hireFormsUtils = _dereq_('hire-forms-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autocomplete = function (_React$Component) {
	_inherits(Autocomplete, _React$Component);

	function Autocomplete(props) {
		_classCallCheck(this, Autocomplete);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Autocomplete).call(this, props));

		_this.handleDocumentClick = function (ev) {
			if (_this.state.options.length) {
				_this.setState({
					options: [],
					query: ''
				});
			}
		};

		_this.cache = {};

		_this.state = {
			options: [],
			query: props.value.value
		};
		return _this;
	}

	_createClass(Autocomplete, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('click', this.handleDocumentClick, false);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				query: nextProps.value.value,
				options: []
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('click', this.handleDocumentClick, false);
		}
	}, {
		key: 'filter',
		value: function filter(inputValue) {
			this.cache[inputValue] = inputValue === '' ? [] : this.props.options.filter(function (value) {
				if ((0, _hireFormsUtils.isKeyValueMap)(value)) {
					value = value.value;
				}

				return value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
			});

			var options = this.cache[inputValue];
			this.setState({
				query: inputValue,
				options: options,
				showIsEmpty: !options.length
			});
		}
	}, {
		key: 'filterAsync',
		value: function filterAsync(inputValue) {
			var _this2 = this;

			this.setState({ 'query': inputValue });

			var done = function done(response) {
				// Add the options to the cache.
				_this2.cache[inputValue] = response;

				// Get the cache from the current (!!!) inputValue. The results trail behind
				// the user typing, so we have to pass the options of the current inputValue,
				// not the options of the inputValue of the fetch.
				var options = _this2.cache.hasOwnProperty(_this2.state.query) ? _this2.cache[_this2.state.query] : [];

				_this2.setState({
					options: options,
					showIsEmpty: !options.length
				});
			};

			this.props.async(inputValue, done.bind(this));
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(inputValue) {
			// Return empty options if inputValue length is beneath a treshold.
			if (inputValue.length < this.props.minLength) {
				return this.setState({
					options: [],
					query: inputValue,
					showIsEmpty: false
				});
			}

			// Return cache if inputValue is found in the cache.
			if (this.cache.hasOwnProperty(inputValue)) {
				var options = this.cache[inputValue];
				return this.setState({
					options: options,
					query: inputValue,
					showIsEmpty: !options.length
				});
			}

			if (this.props.async == null) {
				this.filter(inputValue);
			} else {
				this.filterAsync(inputValue);
			}
		}
	}, {
		key: 'handleInputKeyDown',
		value: function handleInputKeyDown(ev) {
			if (this.refs.options == null) return;

			if (ev.keyCode === 27) this.setState({ options: [], query: '' }); // Escape
			if (ev.keyCode === 38) this.refs.options.highlightPrev(); // Up
			if (ev.keyCode === 40) this.refs.options.highlightNext(); // Down
			if (ev.keyCode === 13) this.refs.options.select(); // Enter
		}
	}, {
		key: 'render',
		value: function render() {
			var options = this.state.options.length ? _react2.default.createElement(_hireFormsOptions2.default, _extends({}, this.props, {
				onSelect: this.props.onChange,
				query: this.state.query,
				ref: 'options',
				values: (0, _hireFormsUtils.castKeyValueArray)(this.state.options) })) : null;

			if (this.props.showIfEmpty && this.state.showIsEmpty) {
				options = _react2.default.createElement(
					'div',
					{ className: 'empty-options' },
					this.props.isEmptyMessage(this.state.query)
				);
			}

			return _react2.default.createElement(
				'div',
				{
					className: 'hire-forms-autocomplete',
					style: { position: 'relative' }
				},
				_react2.default.createElement(_hireFormsInput2.default, {
					onChange: this.handleInputChange.bind(this),
					onKeyDown: this.handleInputKeyDown.bind(this),
					placeholder: this.props.placeholder,
					ref: 'input',
					value: this.state.query
				}),
				this.props.children,
				options
			);
		}
	}]);

	return Autocomplete;
}(_react2.default.Component);

Autocomplete.propTypes = {
	async: _react2.default.PropTypes.func,
	children: _react2.default.PropTypes.element,
	isEmptyMessage: _react2.default.PropTypes.func,
	minLength: _react2.default.PropTypes.number,
	onChange: _react2.default.PropTypes.func,
	options: _hireFormsPropTypes.arrayOfKeyValueMaps,
	placeholder: _react2.default.PropTypes.string,
	showIfEmpty: _react2.default.PropTypes.bool,
	value: _hireFormsPropTypes.keyValueMap
};

Autocomplete.defaultProps = {
	isEmptyMessage: function isEmptyMessage(query) {
		return 'No results found for \'' + query + '\'';
	},
	minLength: 1,
	showIfEmpty: true,
	value: {
		key: '',
		value: ''
	}
};

exports.default = Autocomplete;

},{"hire-forms-input":1,"hire-forms-options":5,"hire-forms-prop-types":2,"hire-forms-utils":3,"react":"react"}],5:[function(_dereq_,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (f) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
		module.exports = f();
	} else if (typeof define === "function" && define.amd) {
		define([], f);
	} else {
		var g;if (typeof window !== "undefined") {
			g = window;
		} else if (typeof global !== "undefined") {
			g = global;
		} else if (typeof self !== "undefined") {
			g = self;
		} else {
			g = this;
		}g.HireFormsOptions = f();
	}
})(function () {
	var define, module, exports;return function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				if (!t[o]) {
					var a = typeof _dereq_ == "function" && _dereq_;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
				}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
					var n = t[o][1][e];return s(n ? n : e);
				}, l, l.exports, e, t, n, r);
			}return n[o].exports;
		}var i = typeof _dereq_ == "function" && _dereq_;for (var o = 0; o < r.length; o++) {
			s(r[o]);
		}return s;
	}({ 1: [function (_dereq_, module, exports) {
			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { "default": obj };
			}

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
		}, { "react": "react" }], 2: [function (_dereq_, module, exports) {
			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _extends = Object.assign || function (target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}return target;
			};

			var _createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
					}
				}return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
			}();

			var _react = _dereq_('react');

			var _react2 = _interopRequireDefault(_react);

			var _option = _dereq_('./option');

			var _option2 = _interopRequireDefault(_option);

			var _sort = _dereq_('./sort');

			var _hireFormsPropTypes = _dereq_('hire-forms-prop-types');

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			}

			function _possibleConstructorReturn(self, call) {
				if (!self) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
			}

			function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
					throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
				}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
			}

			var Options = function (_React$Component) {
				_inherits(Options, _React$Component);

				function Options() {
					var _Object$getPrototypeO;

					var _temp, _this, _ret;

					_classCallCheck(this, Options);

					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Options)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
						activeIndex: null,
						values: _this.props.values
					}, _this.select = function () {
						if (_this.state.activeIndex == null) return;
						_this.props.onSelect(_this.state.values[_this.state.activeIndex]);
					}, _temp), _possibleConstructorReturn(_this, _ret);
				}

				_createClass(Options, [{
					key: 'componentWillMount',
					value: function componentWillMount() {
						this.setState({ values: (0, _sort.sortValues)(this.props) });
					}
				}, {
					key: 'componentDidMount',
					value: function componentDidMount() {
						var node = this.refs.options;
						if (node) node.style.zIndex = 1000;
					}
				}, {
					key: 'componentWillReceiveProps',
					value: function componentWillReceiveProps(nextProps) {
						this.setState({ values: (0, _sort.sortValues)(nextProps) });
					}
				}, {
					key: 'componentWillUnmount',
					value: function componentWillUnmount() {
						var node = this.refs.options;
						if (node) node.style.zIndex = 0;
					}
				}, {
					key: 'highlightPrev',
					value: function highlightPrev() {
						var activeIndex = this.state.activeIndex == null ? -1 : this.state.activeIndex - 1;

						if (activeIndex === -1) {
							activeIndex = this.state.values.length - 1;
						}

						this.setState({ activeIndex: activeIndex });
					}
				}, {
					key: 'highlightNext',
					value: function highlightNext() {
						var activeIndex = this.state.activeIndex == null ? 0 : this.state.activeIndex + 1;

						if (activeIndex === this.state.values.length) {
							activeIndex = 0;
						}

						this.setState({ activeIndex: activeIndex });
					}
				}, {
					key: 'render',
					value: function render() {
						var _this2 = this;

						if (this.state.values.length === 0 && this.props.children == null) {
							return null;
						}

						var listitems = this.state.values.map(function (data, index) {
							return _react2.default.createElement(_option2.default, _extends({}, _this2.props, {
								active: _this2.state.activeIndex === index,
								key: index,
								optionData: data,
								onClick: function onClick() {
									return _this2.setState({ activeIndex: index }, // When an option is clicked, the activeIndex is set
									function () {
										return _this2.select();
									} // After setting the activeIndex, this.select is called
									);
								}
							}));
						});

						var children = this.props.children != null ? _react2.default.createElement('li', { className: 'children' }, this.props.children) : null;

						return _react2.default.createElement('ul', {
							className: 'hire-options',
							ref: 'options'
						}, children, listitems);
					}
				}]);

				return Options;
			}(_react2.default.Component);

			Options.defaultProps = {
				highlightClass: 'highlight',
				query: '',
				sortOn: null,
				value: { key: '', value: '' },
				values: []
			};

			Options.propTypes = {
				children: _react2.default.PropTypes.node,
				highlightClass: _react2.default.PropTypes.string,
				onSelect: _react2.default.PropTypes.func.isRequired,
				optionComponent: _react2.default.PropTypes.func,
				query: _react2.default.PropTypes.string,
				sortOn: _react2.default.PropTypes.oneOf([null, 'alphabet', 'relevance']),
				value: _hireFormsPropTypes.keyValueMapOrArrayOfKeyValueMaps,
				values: _hireFormsPropTypes.arrayOfKeyValueMaps
			};

			exports.default = Options;
		}, { "./option": 3, "./sort": 4, "hire-forms-prop-types": 1, "react": "react" }], 3: [function (_dereq_, module, exports) {
			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _extends = Object.assign || function (target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}return target;
			};

			var _createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
					}
				}return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
			}();

			var _react = _dereq_('react');

			var _react2 = _interopRequireDefault(_react);

			var _classnames = _dereq_('classnames');

			var _classnames2 = _interopRequireDefault(_classnames);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			}

			function _possibleConstructorReturn(self, call) {
				if (!self) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
			}

			function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
					throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
				}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
			}

			var Option = function (_Component) {
				_inherits(Option, _Component);

				function Option() {
					_classCallCheck(this, Option);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
				}

				_createClass(Option, [{
					key: 'render',
					value: function render() {
						var displayValue = this.props.optionData.value;

						if (this.props.query.length) {
							var re = new RegExp(this.props.query, 'ig');
							displayValue = this.props.optionData.value.replace(re, '<span class="' + this.props.highlightClass + '">$&</span>');
						}

						var option = this.props.optionComponent != null ? _react2.default.createElement(this.props.optionComponent, _extends({}, this.props, {
							displayValue: displayValue,
							onClick: this.props.onClick
						})) : _react2.default.createElement('li', {
							className: (0, _classnames2.default)('hire-forms-option', { highlight: this.props.active }),
							dangerouslySetInnerHTML: { __html: displayValue },
							onClick: this.props.onClick
						});

						return option;
					}
				}]);

				return Option;
			}(_react.Component);

			exports.default = Option;

			Option.propTypes = {
				active: _react.PropTypes.bool,
				highlightClass: _react.PropTypes.string,
				optionComponent: _react.PropTypes.func,
				optionData: _react.PropTypes.object,
				onClick: _react.PropTypes.func,
				query: _react.PropTypes.string,
				value: _react.PropTypes.object
			};
		}, { "classnames": "classnames", "react": "react" }], 4: [function (_dereq_, module, exports) {
			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			/**
    * Sort values on relevance. A result is more relevant when the search
    * query is more at the beginning of the string. In other words:
    * String.indexOf(props.query): lower is better.
    * @param {Array<Object>} value An array of key/value maps
    * @param {String} query A search query
    * @returns {Array<Object>} Sorted values on relevance
    */
			var sortOnRelevance = function sortOnRelevance(values, query) {
				return values.sort(function (a, b) {
					a = a.value.toLowerCase();
					b = b.value.toLowerCase();

					var indexA = a.indexOf(query);
					var indexB = b.indexOf(query);

					if (indexA > indexB) return 1;
					if (indexA < indexB) return -1;
					if (indexA === indexB) {
						if (a > b) return 1;
						if (a < b) return -1;
					}

					return 0;
				});
			};

			var sortOnAlphabet = function sortOnAlphabet(a, b) {
				a = a.value.toLowerCase();
				b = b.value.toLowerCase();

				if (a > b) return 1;else if (a < b) return -1;

				return 0;
			};

			var sortValues = exports.sortValues = function sortValues(_ref) {
				var query = _ref.query;
				var sortOn = _ref.sortOn;
				var values = _ref.values;

				var sortedValues = values;

				if (sortOn === 'alphabet') {
					sortedValues = sortedValues.sort(sortOnAlphabet);
				} else if (sortOn === 'relevance') {
					sortedValues = sortOnRelevance(sortedValues, query);
				}

				return sortedValues;
			};
		}, {}] }, {}, [2])(2);
});

},{}]},{},[4])(4)
});