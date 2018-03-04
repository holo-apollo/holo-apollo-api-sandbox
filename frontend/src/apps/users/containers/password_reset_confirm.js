import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Form} from 'react-form';
import autoBind from 'react-autobind';
import cx from 'classnames';

import {TextInput} from 'common/components/inputs';
import {Button} from 'common/components/buttons';
import {DoubleBounceSpinner} from 'common/components/spinners';
import {getQueryParams} from 'helpers/utils';
import {post} from 'helpers/rest';


export class PasswordResetConfirm extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitPending: false,
            submitSuccess: false,
            submitErrors: {
                new_password1: null,
                new_password2: null,
                uid: null,
                token: null,
                common: null
            }
        };
    }

    validateError(values) {
        this.setState({submitErrors: {
                new_password1: null,
                new_password2: null,
                uid: null,
                token: null,
                common: null
            }});
        const errors = {
            new_password1: null,
            new_password2: null
        };
        if (!values.new_password1 || !values.new_password2) {
            errors.new_password1 = gettext('Please type your password twice.');
        } else if (values.new_password1 !== values.new_password2) {
            errors.new_password2 = gettext('Oops... Passwords didn\'t match.');
        }
        return errors;
    }

    onSubmit(values) {
        this.setState({
            submitPending: true
        });
        values = {...values, ...getQueryParams()};
        post(window.django_data.urls.passwordResetConfirmAPI, values)
            .then(() => {
                this.setState({
                    submitPending: false,
                    submitSuccess: true
                });
            }).catch(error => {
                let messages = {
                    common: gettext('Oops! Something went wrong. Please try again in a moment.')
                };
                if (error.response && error.response.data && typeof error.response.data === 'object') {
                    messages = error.response.data;
                }
                this.setState({
                    submitPending: false,
                    submitErrors: messages
                });
            });
    }

    renderForm() {
        return (
            <div className={cx('password-reset-confirm-form', {'hidden': this.state.submitPending || this.state.submitSuccess})}>
                <Form
                    onSubmit={this.onSubmit}
                    validateError={this.validateError}
                    dontValidateOnMount={true}
                    validateOnSubmit={true}
                >
                    {formApi => {
                        return (
                            <form onSubmit={formApi.submitForm}>
                                <div className={'error'}>{this.state.submitErrors.common}</div>
                                {this.state.submitErrors.uid || this.state.submitErrors.token ?
                                    <div className={'error'}>
                                        {gettext('* The password reset link was invalid. Please request a new password reset.')}
                                    </div> :
                                    null
                                }
                                <div className={'inputs'}>
                                    <TextInput
                                        field="new_password1"
                                        type={'password'}
                                        hintText={gettext('New password')}
                                        submitError={
                                            this.state.submitErrors.new_password1 ?
                                                this.state.submitErrors.new_password1.join(' ') :
                                                null
                                        }
                                    />
                                    <TextInput
                                        field="new_password2"
                                        type={'password'}
                                        hintText={gettext('Retype password')}
                                        submitError={
                                            this.state.submitErrors.new_password2 ?
                                                this.state.submitErrors.new_password2.join(' ') :
                                                null
                                        }
                                    />
                                    <Button type={'submit'} classes={'btn-margin'}>
                                        {gettext('Save')}
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
                <h1>{gettext('Change password')}</h1>
                {this.state.submitSuccess &&
                <div className={'subtitle'}>
                    {gettext('Your password has been set. You may go ahead and ')}
                    <a href={window.django_data.urls.login}>{gettext('log in')}</a>{gettext(' now')}.
                </div>}
                {this.state.submitPending && <DoubleBounceSpinner/>}
                {this.renderForm()}
            </div>
        );
    }
}


const PasswordResetConfirmWrapper = () => <MuiThemeProvider><PasswordResetConfirm/></MuiThemeProvider>;


export default PasswordResetConfirmWrapper;
