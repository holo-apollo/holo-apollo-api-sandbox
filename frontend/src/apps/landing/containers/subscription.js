import 'styles/subscription.less';
import React, {Component} from 'react';
import {Form, Text} from 'react-form';
import autoBind from 'react-autobind';
import cx from 'classnames';

import {validateEmail} from 'validators';
import {post} from 'rest';


export default class Subscription extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitSuccess: false,
            submitPending: false,
            submitErrors: {email: null}
        };
    }

    onSubmit(values) {
        this.setState({
            submitSuccess: false,
            submitPending: true
        });
        post('subscriptions/', values)
            .then(() => {
                this.setState({
                    submitSuccess: true,
                    submitPending: false
                });
            })
            .catch(error => {
                let message = 'Oops! Something went wrong. Please try again in a moment.';
                if (error.response && error.response.data.email) {
                    message = error.response.data.email[0];
                }
                this.setState({
                    submitPending: false,
                    submitErrors: {email: message}
                });
            });
    }

    validateError(values) {
        if (!values.email) {
            return {email: 'Please type your email.'};
        } else if (!validateEmail(values.email)) {
            return {email: 'Oops... There\'s a mistake. Please type a valid email.'};
        }
        return {email: null};
    }

    renderForm() {
        return (
            <div className={cx('subscription-form', {'hidden': this.state.submitSuccess || this.state.submitPending})}>
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
                                <div className={'error'}>
                                    {formApi.errors.email}
                                    {this.state.submitErrors.email}
                                </div>
                            </form>
                        );
                    }}
                </Form>
            </div>
        );
    }

    render() {
        return (
            <div className={'subscription'}>
                {this.state.submitSuccess &&
                <h3>You were subscribed successfully! See ya!</h3>}
                {this.state.submitPending &&
                <div>Loading...</div>}
                {this.renderForm()}
            </div>
        );
    }
}