import 'styles/subscription.less';
import React, {Component} from 'react';
import {Form, Text} from 'react-form';
import autoBind from 'react-autobind';
import cx from 'classnames';

import {Button} from 'common/old_components/buttons';
import {DoubleBounceSpinner} from 'common/old_components/spinners';
import {validateEmail} from 'helpers/validators';
import {post} from 'helpers/rest';
import {getQueryParams} from 'helpers/utils';


export default class Subscription extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitSuccess: false,
            alreadySubscribed: false,
            submitPending: false,
            submitErrors: {email: null},
            unsubscribeSuccess: false,
            unsubscribeError: ''
        };
        this._token = getQueryParams().token;
    }

    validateError(values) {
        this.setState({submitErrors: {email: null}});
        if (!values.email) {
            return {email: gettext('Please type your email.')};
        } else if (!validateEmail(values.email)) {
            return {email: gettext('Oops... There\'s a mistake. Please type a valid email.')};
        }
        return {email: null};
    }

    onSubmit(values) {
        this.setState({
            submitSuccess: false,
            submitPending: true
        });
        post('subscriptions/', values)
            .then(response => {
                this.setState({
                    submitSuccess: true,
                    submitPending: false,
                    alreadySubscribed: response.data.already_subscribed
                });
            })
            .catch(error => {
                let message = gettext('Oops! Something went wrong. Please try again in a moment.');
                if (error.response && error.response.data.email) {
                    message = error.response.data.email[0];
                }
                this.setState({
                    submitPending: false,
                    submitErrors: {email: message}
                });
            });
    }

    unsubscribe() {
        this.setState({submitPending: true});
        post('subscriptions/unsubscribe/', {token: this._token})
            .then(() => {
                this.setState({
                    unsubscribeSuccess: true,
                    submitPending: false
                });
            }).catch(error => {
                let message = gettext('Oops! Something went wrong. Please try again in a moment.');
                if (error.response && error.response.data.detail) {
                    message = error.response.data.detail;
                }
                this.setState({
                    submitPending: false,
                    unsubscribeError: message
                });
            });
    }

    renderForm() {
        return (
            <div className={cx('subscription-form', {'hidden': this.state.submitSuccess || this.state.submitPending})}>
                <h5>
                    {gettext('Get notified when it\'s ready')}
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
                                    <Button type={'submit'}>
                                        {gettext('Subscribe')}
                                    </Button>
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

    renderUnsubscribe() {
        if (this.state.unsubscribeError) {
            return <div className={'error'}>{this.state.unsubscribeError}</div>;
        }
        return (
            <div className={cx('unsubscribe', {'hidden': this.state.unsubscribeSuccess || this.state.submitPending})}>
                <h5>{gettext('Are you sure that you want to unsubscribe?')}</h5>
                <span onClick={this.unsubscribe}>
                    <Button>{gettext('Yes, I\'m sure')}</Button>
                </span>
            </div>
        );
    }

    render() {
        return (
            <div className={'subscription'}>
                {this.state.submitSuccess && !this.state.alreadySubscribed &&
                <h4>{gettext('You were subscribed successfully!')}<br/>{gettext('See ya!')}</h4>}
                {this.state.submitSuccess && this.state.alreadySubscribed &&
                <h4>{gettext('Looks like you are already subscribed.')}<br/>
                    {gettext('Thank you for being with us!')}</h4>}
                {this.state.unsubscribeSuccess &&
                <h4>{gettext('You were unsubscribed.')}<br/>
                    {gettext('Hope to see you again.')}</h4>}
                {this.state.submitPending && <DoubleBounceSpinner/>}
                {this._token ? this.renderUnsubscribe() : this.renderForm()}
                <div className={'promise'}>
                    {gettext('We promise to never spam you or share your personal information!')}
                </div>
            </div>
        );
    }
}
