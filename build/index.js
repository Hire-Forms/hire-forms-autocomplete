'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _hireFormsInput = require('hire-forms-input');

var _hireFormsInput2 = _interopRequireDefault(_hireFormsInput);

var _hireFormsOptions = require('hire-forms-options');

var _hireFormsOptions2 = _interopRequireDefault(_hireFormsOptions);

var _hireFormsPropTypes = require('hire-forms-prop-types');

var _hireFormsUtils = require('hire-forms-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autocomplete = function (_Component) {
	_inherits(Autocomplete, _Component);

	function Autocomplete() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Autocomplete);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call.apply(_ref, [this].concat(args))), _this), _this.cache = {}, _this.state = {
			options: [],
			query: _this.props.value.value
		}, _this.handleDocumentClick = function () /* ev */{
			if (_this.state.options.length) {
				_this.setState({
					options: [],
					query: ''
				});
			}
		}, _this.handleInputChange = function (inputValue) {
			// Return empty options if inputValue length is beneath a treshold.
			if (inputValue.length < _this.props.minLength) {
				return _this.setState({
					options: [],
					query: inputValue
				});
			}

			// Return cache if inputValue is found in the cache.
			if (_this.cache.hasOwnProperty(inputValue)) {
				var options = _this.cache[inputValue];
				return _this.setState({
					options: options,
					query: inputValue
				});
			}

			if (_this.props.async == null) {
				_this.filter(inputValue);
			} else {
				_this.filterAsync(inputValue);
			}

			return null;
		}, _this.handleInputKeyDown = function (ev) {
			if (_this.optionsElement == null) return;

			if (ev.keyCode === 27) _this.setState({ options: [], query: '' }); // Escape
			if (ev.keyCode === 38) _this.optionsElement.highlightPrev(); // Up
			if (ev.keyCode === 40) _this.optionsElement.highlightNext(); // Down
			if (ev.keyCode === 13) _this.optionsElement.select(); // Enter
		}, _temp), _possibleConstructorReturn(_this, _ret);
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
				options: options
			});
		}
	}, {
		key: 'filterAsync',
		value: function filterAsync(inputValue) {
			var _this2 = this;

			this.setState({ query: inputValue });

			var done = function done(response) {
				if (response == null) response = [];

				// Add the options to the cache.
				_this2.cache[inputValue] = response;

				// Get the cache from the current (!!!) inputValue. The results trail behind
				// the user typing, so we have to pass the options of the current inputValue,
				// not the options of the inputValue of the fetch.
				var options = _this2.cache.hasOwnProperty(_this2.state.query) ? _this2.cache[_this2.state.query] : [];

				_this2.setState({
					options: options
				});
			};

			this.props.async(inputValue, done.bind(this));
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			// Show nothing found message instead of <Options>, if
			var nothingFound = this.state.query !== '' && // A query has been entered in the <input>
			!this.state.options.length && // The resulting options array is empty
			this.props.showNothingFoundMessage // The showNothingFoundMessage flag is set to true
			;

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('hire-forms-autocomplete', {
						'nothing-found': nothingFound,
						'query-not-in-list': this.state.query !== '' && !this.state.options.some(function (v) {
							return v.value === _this3.state.query;
						})
					}),
					style: { position: 'relative' }
				},
				_react2.default.createElement(_hireFormsInput2.default, {
					focus: this.props.focus,
					onChange: this.handleInputChange,
					onKeyDown: this.handleInputKeyDown,
					placeholder: this.props.placeholder,
					value: this.state.query
				}),
				this.props.children,
				this.state.options.length > 0 && _react2.default.createElement(_hireFormsOptions2.default, {
					onSelect: this.props.onChange,
					query: this.state.query,
					ref: function ref(el) {
						_this3.optionsElement = el;
					},
					values: (0, _hireFormsUtils.castKeyValueArray)(this.state.options)
				}),
				nothingFound && _react2.default.createElement(
					'div',
					{ className: 'empty-options' },
					this.props.nothingFoundMessage(this.state.query)
				)
			);
		}
	}]);

	return Autocomplete;
}(_react.Component);

Autocomplete.propTypes = {
	async: _react.PropTypes.func,
	children: _react.PropTypes.element,
	focus: _react.PropTypes.bool,
	nothingFoundMessage: _react.PropTypes.func,
	minLength: _react.PropTypes.number,
	onChange: _react.PropTypes.func,
	options: _hireFormsPropTypes.arrayOfKeyValueMaps,
	placeholder: _react.PropTypes.string,
	showNothingFoundMessage: _react.PropTypes.bool,
	value: _hireFormsPropTypes.keyValueMap
};

Autocomplete.defaultProps = {
	nothingFoundMessage: function nothingFoundMessage(query) {
		return 'No results found for \'' + query + '\'';
	},
	minLength: 1,
	showNothingFoundMessage: true,
	value: {
		key: '',
		value: ''
	}
};

exports.default = Autocomplete;
