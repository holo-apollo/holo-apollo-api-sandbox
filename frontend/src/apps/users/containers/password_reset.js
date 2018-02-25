import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Form} from 'react-form';
import autoBind from 'react-autobind';
import cx from 'classnames';

import {TextInput} from 'common/components/inputs';
import {Button} from 'common/components/buttons';
import {DoubleBounceSpinner} from 'common/components/spinners';
import ArrowBack from 'apps/users/components/arrow_back';
import {validateEmail} from 'helpers/validators';
import {post} from 'helpers/rest';


class PasswordReset extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitPending: false,
            submitSuccess: false,
            submitError: null
        };
    }

    validateError(values) {
        this.setState({submitError: null});
        const errors = {
            email: null
        };
        if (!values.email) {
            errors.email = gettext('Please type your email.');
        } else if (!validateEmail(values.email)) {
            errors.email = gettext('Oops... There\'s a mistake. Please type a valid email.');
        }
        return errors;
    }

    onSubmit(values) {
        this.setState({
            submitPending: true
        });
        post(window.django_data.urls.passwordResetAPI, values)
            .then(() => {
                this.setState({
                    submitPending: false,
                    submitSuccess: true
                });
            }).catch(error => {
                let message = gettext('Oops! Something went wrong. Please try again in a moment.');
                if (error.response && error.response.data.detail) {
                    message = error.response.data.detail;
                }
                this.setState({
                    submitPending: false,
                    submitSuccess: false,
                    submitError: '* ' + message
                });
            });
    }

    renderForm() {
        return (
            <div className={cx('password-reset-form', {'hidden': this.state.submitPending || this.state.submitSuccess})}>
                <Form
                    onSubmit={this.onSubmit}
                    validateError={this.validateError}
                    dontValidateOnMount={true}
                    validateOnSubmit={true}
                >
                    {formApi => {
                        return (
                            <form onSubmit={formApi.submitForm}>
                                <div className={'error'}>
                                    {this.state.submitError}
                                </div>
                                <div className={'inputs'}>
                                    <TextInput
                                        field="email"
                                        hintText={gettext('Your email')}
                                    />
                                    <Button type={'submit'} classes={'btn-margin'}>
                                        {gettext('Send me info')}
                                    </Button>
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
            <div className={'login-signup'}>
                <h1>{gettext('Password reset')}</h1>
                {this.state.submitSuccess &&
                <div className={'subtitle'}>
                    <p>
                        {gettext('We\'ve emailed you instructions for setting your password, ' +
                            'if an account exists with the email you entered. ' +
                            'You should receive them shortly.')}
                    </p>
                    <p>
                        {gettext('If you don\'t receive an email, ' +
                            'please make sure you\'ve entered the address you registered with, ' +
                            'and check your spam folder.')}
                    </p>
                </div>}
                {this.state.submitPending && <DoubleBounceSpinner/>}
                {this.renderForm()}
                <ArrowBack />
            </div>
        );
    }
}


const PasswordResetWrapper = () => <MuiThemeProvider><PasswordReset/></MuiThemeProvider>;


export default PasswordResetWrapper;
