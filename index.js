"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
const hire_forms_input_1 = require("hire-forms-input");
const hire_forms_options_1 = require("hire-forms-options");
class Autocomplete extends React.Component {
    constructor() {
        super(...arguments);
        this.cache = {};
        this.optionsElement = null;
        this.state = {
            options: [],
            query: this.props.value.value,
        };
        this.handleDocumentClick = () => {
            if (this.state.options.length) {
                this.setState({
                    options: [],
                    query: '',
                });
            }
        };
        this.handleInputChange = (inputValue) => {
            if (inputValue.length < this.props.minLength) {
                return this.setState({
                    options: [],
                    query: inputValue,
                });
            }
            if (this.props.onInputChange != null)
                this.props.onInputChange(inputValue);
            console.log(this.cache, inputValue);
            if (this.cache.hasOwnProperty(inputValue)) {
                const options = this.cache[inputValue];
                return this.setState({
                    options,
                    query: inputValue,
                });
            }
            if (this.props.async == null) {
                this.filter(inputValue);
            }
            else {
                this.filterAsync(inputValue);
            }
            return null;
        };
        this.handleInputKeyDown = (ev) => {
            if (this.optionsElement == null)
                return;
            if (ev.keyCode === 27)
                this.setState({ options: [], query: '' });
            if (ev.keyCode === 38)
                this.optionsElement.highlightPrev();
            if (ev.keyCode === 40)
                this.optionsElement.highlightNext();
            if (ev.keyCode === 13)
                this.optionsElement.select();
        };
    }
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
    filter(inputValue) {
        this.cache[inputValue] = (inputValue === '') ?
            [] :
            this.props.options.filter((option) => option.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
        this.setState({
            query: inputValue,
            options: this.cache[inputValue],
        });
    }
    filterAsync(inputValue) {
        this.setState({ query: inputValue });
        const done = (response) => {
            if (response == null)
                response = [];
            this.cache[inputValue] = response;
            const options = (this.cache.hasOwnProperty(this.state.query)) ?
                this.cache[this.state.query] :
                [];
            this.setState({ options });
        };
        this.props.async(inputValue, done.bind(this));
    }
    render() {
        const nothingFound = (this.state.query !== '' &&
            !this.state.options.length &&
            this.props.showNothingFoundMessage);
        return (React.createElement("div", { className: cx('hire-forms-autocomplete', {
                'nothing-found': nothingFound,
                'query-not-in-list': this.state.query !== '' &&
                    !this.state.options.some((v) => v.value === this.state.query),
            }), style: { position: 'relative' } },
            React.createElement(hire_forms_input_1.default, { focus: this.props.focus, onChange: this.handleInputChange, onKeyDown: this.handleInputKeyDown, placeholder: this.props.placeholder, value: this.state.query }),
            this.props.children,
            this.state.options.length > 0 &&
                React.createElement(hire_forms_options_1.default, { onSelect: this.props.onChange, optionComponent: this.props.optionComponent, query: this.state.query, ref: (el) => { this.optionsElement = el; }, values: this.state.options }),
            nothingFound &&
                React.createElement("div", { className: "empty-options" }, this.props.nothingFoundMessage(this.state.query))));
    }
}
Autocomplete.defaultProps = {
    focus: false,
    nothingFoundMessage: (query) => `No results found for '${query}'`,
    minLength: 1,
    showNothingFoundMessage: false,
    value: { key: '', value: '' },
};
exports.default = Autocomplete;
