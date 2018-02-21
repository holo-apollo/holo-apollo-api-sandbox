import 'styles/login_signup.less';
import React, {Component} from 'react';
import {Form, Text} from 'react-form';
import autoBind from 'react-autobind';
import cx from 'classnames';

import {Button} from 'common/components/buttons';
import {DoubleBounceSpinner} from 'common/components/spinners';
import {validateEmail, validatePhone, validateLength} from 'helpers/validators';
import {get, post} from 'helpers/rest';


export default class Signup extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            submitPending: false,
            submitErrors: {
                email: null,
                password: null,
                first_name: null,
                last_name: null,
                username: null,
                phone: null
            },
            signupStep: 1,
            formValues: {}
        };
    }

    goNext() {
        this.setState({
            signupStep: 2
        });
    }

    goBack() {
        this.setState({
            signupStep: 1
        });
    }

    validateError1(values) {
        this.setState({submitErrors: {
            email: null,
            password: null,
            first_name: null,
            last_name: null,
            username: null,
            phone: null
        }});
        const errors = {
            email: null,
            password: null
        };
        if (!values.email) {
            errors.email = gettext('Please type your email.');
        } else if (!validateEmail(values.email)) {
            errors.email = gettext('Oops... There\'s a mistake. Please type a valid email.');
        }
        // TODO: add strong password validation
        if (!values.password || !values.password2) {
            errors.password = gettext('Please type your password twice.');
        } else if (values.password !== values.password2) {
            errors.password = gettext('Oops... Passwords didn\'t match');
        }
        return errors;
    }

    validateError2(values) {
        this.setState({submitErrors: {
            email: null,
            password: null,
            first_name: null,
            last_name: null,
            username: null,
            phone: null
        }});
        const errors = {
            first_name: null,
            last_name: null,
            username: null,
            phone: null
        };
        if (!validateLength(values.first_name, 30, 2)) {
            errors.first_name = gettext('Please type your first name 2-30 characters long.');
        }
        if (!validateLength(values.last_name, 30)) {
            errors.first_name = gettext('Max length of last name is 30 characters.');
        }
        if (!validateLength(values.username, 30, 2)) {
            errors.username = gettext('Please type your name on the site 2-30 characters long.');
        }
        if (!validatePhone(values.phone)) {
            errors.phone = gettext('Please type a valid phone number.');
        }
        return errors;
    }

    onSubmit1(values) {
        this.setState({
            submitPending: true
        });
        get(`users/check_email/?email=${values.email}`)
            .then(response => {
                this.setState({
                    submitPending: false
                });
                const emailExists = response.data.email_exists;
                if (emailExists) {
                    this.setState({
                        submitErrors: {
                            ...this.state.submitErrors,
                            email: gettext('That email already exists')
                        }
                    });
                } else {
                    this.setState({
                        formValues: {
                            email: values.email,
                            password: values.password
                        }
                    });
                    this.goNext();
                }
            })
            .catch(() => {
                this.setState({
                    submitErrors: {
                        ...this.state.submitErrors,
                        email: gettext('\'Oops! Something went wrong. Please try again in a moment.')
                    }
                });
            });
    }

    onSubmit2(values) {
        this.setState({
            submitPending: true
        });
        values = {...this.state.formValues, ...values};
        post('users/', values)
            .then(() => {
                window.location = '/';  // TODO: change it to profile page
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

    renderTextInput(error, fieldName, placeholder) {
        return [
            <div className={'error'} key={`error-${fieldName}`}>
                {error ? error : this.state.submitErrors[fieldName]}
            </div>,
            <Text
                key={`field-${fieldName}`}
                field={fieldName}
                name={fieldName}
                className={'grow'}
                placeholder={placeholder}
            />
        ];
    }

    renderForm1() {
        return (
            <div className={cx('signup-form', {'hidden': this.state.submitPending || this.state.signupStep !== 1})}>
                <Form
                    onSubmit={this.onSubmit1}
                    validateError={this.validateError1}
                    dontValidateOnMount={true}
                    validateOnSubmit={true}
                >
                    {formApi => {
                        return (
                            <form onSubmit={formApi.submitForm}>
                                <div className={'inputs'}>
                                    {this.renderTextInput(formApi.errors.email, 'email', gettext('Email'))}
                                    <div className={'error'}>
                                        {formApi.errors.password}
                                    </div>
                                    <Text
                                        field="password"
                                        type={'password'}
                                        name={'password'}
                                        className={'grow'}
                                        placeholder={gettext('Make up password')}
                                    />
                                    <Text
                                        field="password2"
                                        type={'password'}
                                        name={'password2'}
                                        className={'grow'}
                                        placeholder={gettext('Retype password')}
                                    />
                                    <Button type={'submit'}>
                                        {gettext('Create account')}
                                    </Button>
                                    <div>{gettext('or')}</div>
                                    <a href={window.django_data.urls.facebook}>
                                        <Button color={'blue'}>
                                            {gettext('Sign up with Facebook')}
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

    renderForm2() {
        return (
            <div className={cx('signup-form', {'hidden': this.state.submitPending || this.state.signupStep !== 2})}>
                <div onClick={this.goBack}>Go back</div>
                <Form
                    onSubmit={this.onSubmit2}
                    validateError={this.validateError2}
                    dontValidateOnMount={true}
                    validateOnSubmit={true}
                >
                    {formApi => {
                        const fields = {
                            first_name: gettext('Your first name *'),
                            last_name: gettext('Your last name'),
                            username: gettext('Name on the site *'),
                            phone: gettext('Phone *')
                        };
                        return (
                            <form onSubmit={formApi.submitForm}>
                                <div className={'inputs'}>
                                    {Object.keys(fields).map(item => {
                                        return this.renderTextInput(formApi.errors[item], item, fields[item]);
                                    })}
                                    <Button type={'submit'}>{gettext('Save')}</Button>
                                </div>

                                <div className={'error'}>{this.state.submitErrors.email}</div>
                                <div className={'error'}>{this.state.submitErrors.common}</div>
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
                <h1>Sign up</h1>
                <div>Already a member? <a href="/login/">Log in</a></div>
                {this.state.submitPending && <DoubleBounceSpinner/>}
                {this.renderForm1()}
                {this.renderForm2()}
            </div>
        );
    }
}
