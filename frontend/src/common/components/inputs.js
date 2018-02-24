import 'styles/form_elements.less';
import React, {Component} from 'react';
import {FormField as fieldWrapper, Checkbox} from 'react-form';
import TextField from 'material-ui/TextField';


class TextFieldWrapper extends Component {
    render() {
        const {
            fieldApi,
            onInput,
            submitError,
            ...rest
        } = this.props;

        const {
            getError,
            setValue,
            setTouched
        } = fieldApi;

        const error = getError() || submitError;
        const errorStyle = {fontSize: 16, textAlign: 'center'};

        return (
            <TextField
                onInput={(e) => {
                    setValue(e.target.value);
                    if (onInput) {
                        onInput(e);
                    }
                }}
                onBlur={() => {
                    setTouched();
                }}
                errorText={error ? `* ${error}` : null}
                errorStyle={errorStyle}
                className={'inp'}
                {...rest}
            />
        );
    }
}


export const TextInput = fieldWrapper(TextFieldWrapper);


export const CheckboxInline = ({field, labelText, errorText = null}) => {
    return (
        <div className={'checkbox-inline-container'}>
            <div className={'checkbox-inline'}>
                <Checkbox field={field} id={field}/>
                <label htmlFor={field}>{labelText}</label>
            </div>
            <div className={'error'}>{errorText}</div>
        </div>
    );
};
