import * as React from 'react';
import * as cx from 'classnames';
import Input from 'hire-forms-input';
import Options, { IOptionComponentProps } from 'hire-forms-options';

interface IKeyValue {
	key: string | number;
	value: string;
}

export interface IAutocompleteProps {
	async?: (inputValue: string, done: (response: IKeyValue[]) => void) => void;
	focus?: boolean;
	minLength?: number;
	nothingFoundMessage?: (message: string) => string;
	onChange: (option: IKeyValue) => void;
	onInputChange?: (inputValue: string) => void;
	optionComponent?: React.StatelessComponent<IOptionComponentProps>
	options?: IKeyValue[];
	placeholder?: string;
	showNothingFoundMessage?: boolean;
	value?: IKeyValue;
}

interface IState {
	options: IKeyValue[];
	query: string;
}

class Autocomplete extends React.Component<IAutocompleteProps, IState> {
	private cache = {};
	private optionsElement = null;

	public static defaultProps: Partial<IAutocompleteProps> = {
		focus: false,
		nothingFoundMessage: (query) => `No results found for '${query}'`,
		minLength: 1,
		showNothingFoundMessage: false,
		value: { key: '',  value: '' },
	};

	public state = {
		options: [],
		query: this.props.value.value,
	};

	public componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick, false);
	}

	public componentWillReceiveProps(nextProps) {
		// Todo: Value is reset after props.onInputChange in this.handleInputChange
		this.setState({
			query: nextProps.value.value,
			options: [],
		});
	}

	public componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick, false);
	}

	private handleDocumentClick = (/* ev */) => {
		if (this.state.options.length) {
			this.setState({
				options: [],
				query: '',
			});
		}
	};

	private filter(inputValue) {
		this.cache[inputValue] = (inputValue === '') ?
			[] :
			this.props.options.filter((option: IKeyValue) =>
				option.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
			);

		this.setState({
			query: inputValue,
			options: this.cache[inputValue],
		});
	}

	private filterAsync(inputValue) {
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

			this.setState({ options });
		};

		this.props.async(inputValue, done.bind(this));
	}

	private handleInputChange = (inputValue) => {
		// Return empty options if inputValue length is beneath a treshold.
		if (inputValue.length < this.props.minLength) {
			return this.setState({
				options: [],
				query: inputValue,
			});
		}

		if (this.props.onInputChange != null) this.props.onInputChange(inputValue);

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

	private handleInputKeyDown = (ev) => {
		if (this.optionsElement == null) return;

		if (ev.keyCode === 27) this.setState({ options: [], query: '' });   // Escape
		if (ev.keyCode === 38) this.optionsElement.highlightPrev();         // Up
		if (ev.keyCode === 40) this.optionsElement.highlightNext();         // Down
		if (ev.keyCode === 13) this.optionsElement.select();                // Enter
	};

	public render() {
		// Show nothing found message instead of <Options>, if ...
		const nothingFound = (
			// ... a query has been entered in the <input>
			this.state.query !== '' &&
			// ... the resulting options array is empty
			!this.state.options.length &&
			// ... the showNothingFoundMessage flag is set to true
			this.props.showNothingFoundMessage
		);

		return (
			<div
				className={cx(
					'hire-forms-autocomplete',
					{
						'nothing-found': nothingFound,
						'query-not-in-list':
							this.state.query !== '' &&
							!this.state.options.some((v) => v.value === this.state.query),
					}
				)}
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
						optionComponent={this.props.optionComponent}
						query={this.state.query}
						ref={(el) => { this.optionsElement = el; }}
						values={this.state.options}
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

export default Autocomplete;
