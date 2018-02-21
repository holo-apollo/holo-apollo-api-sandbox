import 'styles/login_signup.less';
import React, {Component} from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import {Form} from 'react-form';

import {TextInput} from 'common/components/inputs';
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
                password2: null,
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
            password2: null,
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
            errors.password2 = gettext('Oops... Passwords didn\'t match');
        }
        return errors;
    }

    validateError2(values) {
        this.setState({submitErrors: {
            email: null,
            password: null,
            password2: null,
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
                                    <TextInput
                                        field={'email'}
                                        hintText={gettext('Your email')}
                                        submitError={this.state.submitErrors.email}
                                    />
                                    <TextInput
                                        field="password"
                                        type={'password'}
                                        hintText={gettext('Make up password')}
                                    />
                                    <TextInput
                                        field="password2"
                                        type={'password'}
                                        hintText={gettext('Retype password')}
                                    />
                                    <Button type={'submit'}>
                                        {gettext('Create account')}
                                    </Button>
                                    <div className={'btn-separator'}>{gettext('or')}</div>
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
                                <div className={'error'}>{this.state.submitErrors.email}</div>
                                <div className={'error'}>{this.state.submitErrors.common}</div>
                                <div className={'inputs'}>
                                    {Object.keys(fields).map(item => {
                                        return (
                                            <TextInput
                                                key={item}
                                                field={item}
                                                hintText={fields[item]}
                                                submitError={this.state.submitErrors[item]}
                                            />
                                        );
                                    })}
                                    <Button type={'submit'}>{gettext('Save')}</Button>
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
                <div
                    className={'arrow-back'}
                    onClick={this.goBack}
                >
                    <img src={`${window.django_data.urls.staticRoot}img/arrow-back.svg`}/>
                </div>
                <h1>Sign up</h1>
                <div className={'subtitle'}>Already a member? <a href="/login/">Log in</a></div>
                {this.state.submitPending && <DoubleBounceSpinner/>}
                {this.renderForm1()}
                {this.renderForm2()}
            </div>
        );
    }
}
