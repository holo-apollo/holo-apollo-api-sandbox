import 'styles/subscription.less';
import React, {Component} from 'react';
import {Form, Text} from 'react-form';
import autoBind from 'react-autobind';
import cx from 'classnames';

import {Button} from 'common/components/buttons';
import {DoubleBounceSpinner} from 'common/components/spinners';
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
        this.setState({submitErrors: {email: null}});
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
                <h5>
                    Get notified when it's ready
                </h5>
                <Form
                    onSubmit={this.onSubmit}
                    validateError={this.validateError}
                    dontValidateOnMount={true}
                    validateOnSubmit={true}
                >
                    {formApi => {
                        return (
                            <form onSubmit={formApi.submitForm}>
                                <div className={'inputs'}>
                                    <Text
                                        field="email"
                                        name={'email'}
                                        className={'grow'}
                                        placeholder={'Email'}
                                    />
                                    <Button>Subscribe</Button>
                                </div>
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
                <h4>You were subscribed successfully!<br/>See ya!</h4>}
                {this.state.submitPending && <DoubleBounceSpinner/>}
                {this.renderForm()}
                <div className={'promise'}>
                    We promise to never spam you or share your personal information!
                </div>
            </div>
        );
    }
}
