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

		this.state = {
			options: [],
			query: props.value.value
		};
	}

	handleInputChange(inputValue) {
		// Return empty options if inputValue length is beneath a treshold.
		if (inputValue.length < this.props.minLength) {
			return this.setState({
				inputValue: inputValue,
				options: []
			});
		}

		this.filter(inputValue);
	}

	filter(inputValue) {
		let options = (inputValue === "") ?
			[] :
			this.props.options.filter((value) => {
				if (isKeyValueMap(value)) {
					value = value.value;
				}

				return (value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
			});

		this.setState({
			query: inputValue,
			options: options
		});
	}

	handleInputKeyDown(ev) {
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

		// Escape
		if (ev.keyCode === 27) {
			this.setState({
				options: [],
				query: ""
			});
		}
	}

	/*
	 * @param {Object} value Key/value map, ie: {key: "A", value: "A"}
	 */
	handleOptionsChange(value) {
		this.props.onChange(value);
	}

	render() {
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
				<Options
					onChange={this.handleOptionsChange.bind(this)}
					query={this.state.query}
					ref="options"
					value={this.props.value}
					values={castKeyValueArray(this.state.options)} />
			</div>
		);
	}
}

Autocomplete.propTypes = {
	children: React.PropTypes.element,
	minLength: React.PropTypes.number,
	onChange: React.PropTypes.func,
	options: arrayOfKeyValueMaps,
	placeholder: React.PropTypes.string,
	value: keyValueMap
};

Autocomplete.defaultProps = {
	value: ""
};

export default Autocomplete;