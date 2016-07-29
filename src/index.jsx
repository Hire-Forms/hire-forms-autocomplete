import React from 'react';
import Input from 'hire-forms-input';
import Options from 'hire-forms-options';
import { arrayOfKeyValueMaps, keyValueMap } from 'hire-forms-prop-types';
import { castKeyValueArray, isKeyValueMap } from 'hire-forms-utils';

class Autocomplete extends React.Component {
	constructor(props) {
		super(props);

		this.cache = {};

		this.state = {
			options: [],
			query: props.value.value,
		};
	}

	componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick, false);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			query: nextProps.value.value,
			options: []
		});
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick, false);
	}

	handleDocumentClick = (ev) => {
		if (this.state.options.length) {
			this.setState({
				options: [],
				query: ''
			});
		}
	}

	filter(inputValue) {
		this.cache[inputValue] = (inputValue === '') ?
			[] :
			this.props.options.filter((value) => {
				if (isKeyValueMap(value)) {
					value = value.value;
				}

				return (value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
			});

		const options = this.cache[inputValue];
		this.setState({
			query: inputValue,
			options: options,
			showIsEmpty: !options.length,
		});
	}

	filterAsync(inputValue) {
		this.setState({'query': inputValue});

		const done = (response) => {
			// Add the options to the cache.
			this.cache[inputValue] = response;

			// Get the cache from the current (!!!) inputValue. The results trail behind
			// the user typing, so we have to pass the options of the current inputValue,
			// not the options of the inputValue of the fetch.
			const options = (this.cache.hasOwnProperty(this.state.query)) ?
				this.cache[this.state.query] :
				[];

			this.setState({
				options: options,
				showIsEmpty: !options.length,
			});
		};

		this.props.async(inputValue, done.bind(this));
	};

	handleInputChange(inputValue) {
		// Return empty options if inputValue length is beneath a treshold.
		if (inputValue.length < this.props.minLength) {
			return this.setState({
				options: [],
				query: inputValue,
				showIsEmpty: false,
			});
		}

		// Return cache if inputValue is found in the cache.
		if (this.cache.hasOwnProperty(inputValue)) {
			const options = this.cache[inputValue];
			return this.setState({
				options: options,
				query: inputValue,
				showIsEmpty: !options.length,
			});
		}

		if (this.props.async == null) {
			this.filter(inputValue);
		} else {
			this.filterAsync(inputValue);
		}
	}

	handleInputKeyDown(ev) {
		if (this.refs.options == null) return;

		if (ev.keyCode === 27) this.setState({ options: [], query: '' }); // Escape
		if (ev.keyCode === 38) this.refs.options.highlightPrev();         // Up
		if (ev.keyCode === 40) this.refs.options.highlightNext();         // Down
		if (ev.keyCode === 13) this.refs.options.select();                // Enter
	}

	render() {
		let options = (this.state.options.length) ?
			<Options
				{...this.props}
				onSelect={this.props.onChange}
				query={this.state.query}
				ref="options"
				values={castKeyValueArray(this.state.options)} /> :
			null;

		if (this.props.showIfEmpty && this.state.showIsEmpty) {
			options = (
				<div className="empty-options">
					{this.props.isEmptyMessage(this.state.query)}
				</div>
			);
		}

		return (
			<div
				className="hire-forms-autocomplete"
				style={{ position: 'relative' }}
			>
				<Input
					onChange={this.handleInputChange.bind(this)}
					onKeyDown={this.handleInputKeyDown.bind(this)}
					placeholder={this.props.placeholder}
					ref="input"
					value={this.state.query}
				/>
				{this.props.children}
				{options}
			</div>
		);
	}
}

Autocomplete.propTypes = {
	async: React.PropTypes.func,
	children: React.PropTypes.element,
	isEmptyMessage: React.PropTypes.func,
	minLength: React.PropTypes.number,
	onChange: React.PropTypes.func,
	options: arrayOfKeyValueMaps,
	placeholder: React.PropTypes.string,
	showIfEmpty: React.PropTypes.bool,
	value: keyValueMap
};

Autocomplete.defaultProps = {
	isEmptyMessage: (query) => `No results found for '${query}'`,
	minLength: 1,
	showIfEmpty: true,
	value: {
		key: '',
		value: ''
	}
};

export default Autocomplete;
