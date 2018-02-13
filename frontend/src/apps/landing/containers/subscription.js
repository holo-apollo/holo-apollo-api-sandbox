import 'styles/subscription.less';
import React, {Component} from 'react';
import {Form, Text} from 'react-form';
import autoBind from 'react-autobind';

import {validateEmail} from 'validators';


export default class Subscription extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    onSubmit(values) {
        console.log('Submit', values);
    }

    validateError(values) {
        console.log('Validate', values);
        console.log(validateEmail(values.email));
        if (!values.email) {
            return {email: 'Please type your email.'};
        } else if (!validateEmail(values.email)) {
            return {email: 'Oops... There\'s a mistake. Please type a valid email.'};
        }
        return {email: null};
    }

    render() {
        return (
            <div className={'subscription'}>
                <Form
                    onSubmit={this.onSubmit}
                    validateError={this.validateError}
                    dontValidateOnMount={true}
                    validateOnSubmit={true}
                >
                    {formApi => {
                        return (
                            <form onSubmit={formApi.submitForm}>
                                <Text field="email" id="hello" />
                                <button type="submit">Submit</button>
                                <div className={'error'}>{formApi.errors.email}</div>
                            </form>
                        );
                    }}
                </Form>
            </div>
        );
    }
}