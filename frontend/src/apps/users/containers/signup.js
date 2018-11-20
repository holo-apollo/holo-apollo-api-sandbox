import React, { Component } from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Form } from 'react-form';

import { TextInput, CheckboxInline } from 'common/old_components/inputs';
import { Button, FacebookButton } from 'common/old_components/buttons';
import { DoubleBounceSpinner } from 'common/old_components/spinners';
import ArrowBack from 'apps/users/components/arrow_back';
import {
  validateEmail,
  validatePhone,
  validateLength,
} from 'helpers/validators';
import { get, post } from 'helpers/rest';
import { redirect } from 'helpers/utils';

export class Signup extends Component {
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
        phone: null,
      },
      signupStep: 1,
      formValues: {},
    };
  }

  goNext() {
    this.setState({
      signupStep: 2,
    });
  }

  goBack() {
    this.setState({
      signupStep: 1,
    });
  }

  validateError1(values) {
    this.setState({
      submitErrors: {
        email: null,
        password: null,
        password2: null,
        first_name: null,
        last_name: null,
        username: null,
        phone: null,
      },
    });
    const errors = {
      email: null,
      password: null,
      password2: null,
      terms_agree: null,
    };
    if (!values.email) {
      errors.email = gettext('Please type your email.');
    } else if (!validateEmail(values.email)) {
      errors.email = gettext(
        "Oops... There's a mistake. Please type a valid email."
      );
    }
    // TODO: add strong password validation
    if (!values.password || !values.password2) {
      errors.password = gettext('Please type your password twice.');
    } else if (values.password !== values.password2) {
      errors.password2 = gettext("Oops... Passwords didn't match.");
    }

    if (!values.terms_agree) {
      errors.terms_agree = gettext('You must accept Terms of Use to sign up.');
    }
    return errors;
  }

  validateError2(values) {
    this.setState({
      submitErrors: {
        email: null,
        password: null,
        password2: null,
        first_name: null,
        last_name: null,
        username: null,
        phone: null,
      },
    });
    const errors = {
      first_name: null,
      last_name: null,
      username: null,
      phone: null,
    };
    if (!validateLength(values.first_name, 30, 2)) {
      errors.first_name = gettext(
        'Please type your first name 2-30 characters long.'
      );
    }
    if (!validateLength(values.last_name, 30)) {
      errors.last_name = gettext('Max length of last name is 30 characters.');
    }
    if (!validateLength(values.username, 30, 2)) {
      errors.username = gettext(
        'Please type your name on the site 2-30 characters long.'
      );
    }
    if (!validatePhone(values.phone)) {
      errors.phone = gettext('Please type a valid phone number.');
    }
    return errors;
  }

  onSubmit1(values) {
    this.setState({
      submitPending: true,
    });
    get(`${window.django_data.urls.checkEmailAPI}?email=${values.email}`)
      .then(response => {
        this.setState({
          submitPending: false,
        });
        const emailExists = response.data.email_exists;
        if (emailExists) {
          this.setState({
            submitErrors: {
              ...this.state.submitErrors,
              email: gettext('That email already exists.'),
            },
          });
        } else {
          this.setState({
            formValues: {
              email: values.email,
              password: values.password,
            },
          });
          this.goNext();
        }
      })
      .catch(() => {
        this.setState({
          submitPending: false,
          submitErrors: {
            ...this.state.submitErrors,
            common: gettext(
              'Oops! Something went wrong. Please try again in a moment.'
            ),
          },
        });
      });
  }

  onSubmit2(values) {
    this.setState({
      submitPending: true,
    });
    values = { ...this.state.formValues, ...values };
    post(window.django_data.urls.signupAPI, values)
      .then(() => {
        redirect('/'); // TODO: change it to profile page
      })
      .catch(error => {
        let messages = {
          common: gettext(
            'Oops! Something went wrong. Please try again in a moment.'
          ),
        };
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === 'object'
        ) {
          messages = error.response.data;
        }
        this.setState({
          submitPending: false,
          submitErrors: messages,
        });
      });
  }

  renderForm1() {
    return (
      <div
        className={cx('signup-form', 'signup1', {
          hidden: this.state.submitPending || this.state.signupStep !== 1,
        })}
      >
        <Form
          onSubmit={this.onSubmit1}
          validateError={this.validateError1}
          dontValidateOnMount={true}
          validateOnSubmit={true}
        >
          {formApi => {
            return (
              <form onSubmit={formApi.submitForm}>
                <div className={'error'}>
                  * {this.state.submitErrors.common}
                </div>
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
                  <CheckboxInline
                    field={'terms_agree'}
                    labelText={
                      <span>
                        {gettext('I agree with ')}
                        <a href={window.django_data.urls.tou}>
                          {gettext('Terms of Use')}
                        </a>
                      </span>
                    }
                    errorText={
                      formApi.errors.terms_agree
                        ? `* ${formApi.errors.terms_agree}`
                        : null
                    }
                  />
                  <Button type={'submit'}>{gettext('Create account')}</Button>
                  <div className={'btn-separator'}>{gettext('or')}</div>
                  {formApi.values.terms_agree ? (
                    <a href={window.django_data.urls.facebook}>
                      <FacebookButton signup={true} />
                    </a>
                  ) : (
                    <span
                      onClick={() => {
                        formApi.setError(
                          'terms_agree',
                          gettext('You must accept Terms of Use to sign up.')
                        );
                      }}
                    >
                      <FacebookButton signup={true} />
                    </span>
                  )}
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
      <div
        className={cx('signup-form', 'signup2', {
          hidden: this.state.submitPending || this.state.signupStep !== 2,
        })}
      >
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
              phone: gettext('Phone *'),
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
        <h1>
          {this.state.signupStep === 1
            ? pgettext('noun', 'Sign up')
            : gettext("Let's start")}
        </h1>
        {this.state.signupStep === 1 && (
          <div className={'subtitle'}>
            {gettext('Already a member? ')}
            <a href={window.django_data.urls.login}>{gettext('Log in')}</a>
          </div>
        )}
        {this.state.submitPending && <DoubleBounceSpinner />}
        {this.renderForm1()}
        {this.renderForm2()}
        {this.state.signupStep === 1 ? (
          <ArrowBack />
        ) : (
          <ArrowBack clickHandler={this.goBack} />
        )}
      </div>
    );
  }
}

const SignupWrapper = () => (
  <MuiThemeProvider>
    <Signup />
  </MuiThemeProvider>
);

export default SignupWrapper;
