/// <reference types="react" />
import * as React from 'react';
import { IOptionComponentProps } from 'hire-forms-options';
export interface IKeyValue {
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
    optionComponent?: React.StatelessComponent<IOptionComponentProps>;
    options?: IKeyValue[];
    placeholder?: string;
    showNothingFoundMessage?: boolean;
    value?: IKeyValue;
}
export interface IState {
    options: IKeyValue[];
    query: string;
}
declare class Autocomplete extends React.Component<IAutocompleteProps, IState> {
    private cache;
    private optionsElement;
    static defaultProps: Partial<IAutocompleteProps>;
    state: {
        options: any[];
        query: string;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    private handleDocumentClick;
    private filter(inputValue);
    private filterAsync(inputValue);
    private handleInputChange;
    private handleInputKeyDown;
    render(): JSX.Element;
}
export default Autocomplete;
