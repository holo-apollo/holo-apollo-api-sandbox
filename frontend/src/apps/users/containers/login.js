import 'styles/login_signup.less';
import React, {Component} from 'react';
import {Form} from 'react-form';
import autoBind from 'react-autobind';
import cx from 'classnames';

import {TextInput} from 'common/components/inputs';
import {Button} from 'common/components/buttons';
import {DoubleBounceSpinner} from 'common/components/spinners';
import {validateEmail, validatePhone} from 'helpers/validators';
import {post} from 'helpers/rest';


export default class Login extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitPending: false,
            submitError: null
        };
    }

    validateError(values) {
        this.setState({submitError: null});
        const errors = {
            username: null,
            password: null
        };
        if (!values.username) {
            errors.username = gettext('Please type your email or phone.');
        } else if (!validateEmail(values.username) && !validatePhone(values.username)) {
            errors.username = gettext('Oops... There\'s a mistake. Please type a valid email or phone.');
        }
        if (!values.password) {
            errors.password = gettext('Please type your password.');
        }
        return errors;
    }

    onSubmit(values) {
        this.setState({
            submitPending: true
        });
        post('users/login/', values)
            .then(() => {
                window.location = '/';  // TODO: this should be value of 'next' query param
            }).catch(error => {
                let message = gettext('Oops! Something went wrong. Please try again in a moment.');
                if (error.response && error.response.data.detail) {
                    message = error.response.data.detail;
                }
                this.setState({
                    submitPending: false,
                    submitError: '* ' + message
                });
            });
    }

    renderForm() {
        return (
            <div className={cx('login-form', {'hidden': this.state.submitPending})}>
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
                                        field="username"
                                        hintText={gettext('Email or phone')}
                                    />
                                    <TextInput
                                        field="password"
                                        type={'password'}
                                        hintText={gettext('Password')}
                                    />
                                    <Button type={'submit'}>
                                        {gettext('Log in')}
                                    </Button>
                                    <div className={'btn-separator'}>{gettext('or')}</div>
                                    <a href={window.django_data.urls.facebook}>
                                        <Button color={'blue'}>
                                            {gettext('Log in with Facebook')}
                                        </Button>
                                    </a>
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
                <h1>Log in</h1>
                <div className={'subtitle'}>Don't have an account? <a href="/signup/">Sign up</a></div>
                {this.state.submitPending && <DoubleBounceSpinner/>}
                {this.renderForm()}
            </div>
        );
    }
}
