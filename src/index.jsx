import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Input from 'hire-forms-input';
import Options from 'hire-forms-options';
import { arrayOfKeyValueMaps, keyValueMap } from 'hire-forms-prop-types';
import { castKeyValueArray, isKeyValueMap } from 'hire-forms-utils';

class Autocomplete extends Component {
	cache = {};

	state = {
		options: [],
		query: this.props.value.value,
	};

	componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick, false);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			query: nextProps.value.value,
			options: [],
		});
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick, false);
	}

	handleDocumentClick = (/* ev */) => {
		if (this.state.options.length) {
			this.setState({
				options: [],
				query: '',
			});
		}
	};

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
			options,
		});
	}

	filterAsync(inputValue) {
		this.setState({ query: inputValue });

		const done = (response) => {
			if (response == null) response = [];

			// Add the options to the cache.
			this.cache[inputValue] = response;

			// Get the cache from the current (!!!) inputValue. The results trail behind
			// the user typing, so we have to pass the options of the current inputValue,
			// not the options of the inputValue of the fetch.
			const options = (this.cache.hasOwnProperty(this.state.query)) ?
				this.cache[this.state.query] :
				[];

			this.setState({
				options,
			});
		};

		this.props.async(inputValue, done.bind(this));
	}

	handleInputChange = (inputValue) => {
		// Return empty options if inputValue length is beneath a treshold.
		if (inputValue.length < this.props.minLength) {
			return this.setState({
				options: [],
				query: inputValue,
			});
		}

		// Return cache if inputValue is found in the cache.
		if (this.cache.hasOwnProperty(inputValue)) {
			const options = this.cache[inputValue];
			return this.setState({
				options,
				query: inputValue,
			});
		}

		if (this.props.async == null) {
			this.filter(inputValue);
		} else {
			this.filterAsync(inputValue);
		}

		return null;
	};

	handleInputKeyDown = (ev) => {
		if (this.optionsElement == null) return;

		if (ev.keyCode === 27) this.setState({ options: [], query: '' }); // Escape
		if (ev.keyCode === 38) this.optionsElement.highlightPrev();         // Up
		if (ev.keyCode === 40) this.optionsElement.highlightNext();         // Down
		if (ev.keyCode === 13) this.optionsElement.select();                // Enter
	};

	render() {
		// Show nothing found message instead of <Options>, if
		const nothingFound = (
			this.state.query !== '' && // A query has been entered in the <input>
			!this.state.options.length && // The resulting options array is empty
			this.props.showNothingFoundMessage // The showNothingFoundMessage flag is set to true
		);

		return (
			<div
				className={cx('hire-forms-autocomplete', {
					'nothing-found': nothingFound,
					'query-not-in-list':
						this.state.query !== '' &&
						!this.state.options.some((v) => v.value === this.state.query),
				})}
				style={{ position: 'relative' }}
			>
				<Input
					focus={this.props.focus}
					onChange={this.handleInputChange}
					onKeyDown={this.handleInputKeyDown}
					placeholder={this.props.placeholder}
					value={this.state.query}
				/>
				{this.props.children}
				{
					this.state.options.length > 0 &&
					<Options
						onSelect={this.props.onChange}
						query={this.state.query}
						ref={(el) => { this.optionsElement = el; }}
						values={castKeyValueArray(this.state.options)}
					/>
				}
				{
					nothingFound &&
					<div className="empty-options">
						{this.props.nothingFoundMessage(this.state.query)}
					</div>
				}
			</div>
		);
	}
}

Autocomplete.propTypes = {
	async: PropTypes.func,
	children: PropTypes.element,
	focus: PropTypes.bool,
	nothingFoundMessage: PropTypes.func,
	minLength: PropTypes.number,
	onChange: PropTypes.func,
	options: arrayOfKeyValueMaps,
	placeholder: PropTypes.string,
	showNothingFoundMessage: PropTypes.bool,
	value: keyValueMap,
};

Autocomplete.defaultProps = {
	nothingFoundMessage: (query) => `No results found for '${query}'`,
	minLength: 1,
	showNothingFoundMessage: true,
	value: {
		key: '',
		value: '',
	},
};

export default Autocomplete;
