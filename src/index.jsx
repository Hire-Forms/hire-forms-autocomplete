import React from "react";

import Input from "hire-forms-input";
import Options from "hire-forms-options";

import {arrayOfKeyValueMaps, keyValueMap} from "hire-forms-prop-types";
import {castKeyValueArray, isKeyValueMap} from "hire-forms-utils";

class Autocomplete extends React.Component {
	componentWillReceiveProps(nextProps) {
		this.setState({
			query: nextProps.value.value,
			options: []
		});
	}

	constructor(props) {
		super(props);

		this.cache = {};

		this.state = {
			options: [],
			query: props.value.value
		};
	}

	handleInputChange(inputValue) {
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

	filterAsync(inputValue) {
		this.setState({"query": inputValue});

		let done = function(response) {
			// Add the options to the cache.
			this.cache[inputValue] = response;

			// Get the cache from the current (!!!) inputValue. The results trail behind
			// the user typing, so we have to pass the options of the current inputValue,
			// not the options of the inputValue of the fetch.
			let state = (this.cache.hasOwnProperty(this.state.query)) ?
				{options: this.cache[this.state.query]} :
				{options: []};

			this.setState(state);
		};

		this.props.async(inputValue, done.bind(this));
	};

	filter(inputValue) {
		this.cache[inputValue] = (inputValue === "") ?
			[] :
			this.props.options.filter((value) => {
				if (isKeyValueMap(value)) {
					value = value.value;
				}

				return (value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
			});

		this.setState({
			query: inputValue,
			options: this.cache[inputValue]
		});
	}

	handleInputKeyDown(ev) {
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

	/*
	 * @param {Object} value Key/value map, ie: {key: "A", value: "A"}
	 */
	handleOptionsChange(value) {
		this.props.onChange(value);
	}

	render() {
		let options = (this.state.options.length !== 0) ?
			<Options
				onChange={this.handleOptionsChange.bind(this)}
				query={this.state.query}
				ref="options"
				value={this.props.value}
				values={castKeyValueArray(this.state.options)} /> :
			null;

		return (
			<div
				className="hire-forms-autocomplete"
				style={{position: "relative"}}>
				<Input
					onChange={this.handleInputChange.bind(this)}
					onKeyDown={this.handleInputKeyDown.bind(this)}
					placeholder={this.props.placeholder}
					ref="input"
					value={this.state.query} />
				{this.props.children}
				{options}
			</div>
		);
	}
}

Autocomplete.propTypes = {
	async: React.PropTypes.func,
	children: React.PropTypes.element,
	minLength: React.PropTypes.number,
	onChange: React.PropTypes.func,
	options: arrayOfKeyValueMaps,
	placeholder: React.PropTypes.string,
	value: keyValueMap
};

Autocomplete.defaultProps = {
	minLength: 1,
	value: {
		key: "",
		value: ""
	}
};

export default Autocomplete;