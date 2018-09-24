import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import {Signup} from 'apps/users/containers/signup';
import {DoubleBounceSpinner} from 'common/components/spinners';
import ArrowBack from 'apps/users/components/arrow_back';
import * as rest from 'helpers/rest';
import * as utils from 'helpers/utils';


window.django_data.urls.checkEmailAPI = 'users/check_email/';
window.django_data.urls.signupAPI = 'users/';


describe('Signup component', function() {
  beforeEach(function() {
    this.wrapper = shallow(<Signup />);
  });

  it('should have correct class', function() {
    expect(this.wrapper.find('.login-signup').exists()).to.equal(true);
  });

  it('should not show spinner', function() {
    expect(this.wrapper.find(DoubleBounceSpinner).exists()).to.equal(false);
  });

  it('should show spinner when pending', function() {
    this.wrapper.setState({submitPending: true});
    expect(this.wrapper.find(DoubleBounceSpinner).exists()).to.equal(true);
  });

  it('should render form on step 1', function() {
    expect(this.wrapper.find('.signup-form.signup1').exists()).to.equal(true);
    expect(this.wrapper.find('.signup-form.signup1.hidden').exists()).to.equal(false);
  });

  it('should hide form step 1 when pending', function() {
    this.wrapper.setState({submitPending: true});
    expect(this.wrapper.find('.signup-form.signup1.hidden').exists()).to.equal(true);
  });

  it('should hide form step 1 on step 2', function() {
    this.wrapper.setState({signupStep: 2});
    expect(this.wrapper.find('.signup-form.signup1.hidden').exists()).to.equal(true);
  });

  it('should render form on step 2', function() {
    this.wrapper.setState({signupStep: 2});
    expect(this.wrapper.find('.signup-form.signup2').exists()).to.equal(true);
    expect(this.wrapper.find('.signup-form.signup2.hidden').exists()).to.equal(false);
  });

  it('should hide form step 2 when pending', function() {
    this.wrapper.setState({signupStep: 2, submitPending: true});
    expect(this.wrapper.find('.signup-form.signup2.hidden').exists()).to.equal(true);
  });

  it('should hide form step 2 on step 1', function() {
    expect(this.wrapper.find('.signup-form.signup2.hidden').exists()).to.equal(true);
  });

  it('should render ArrowBack', function() {
    expect(this.wrapper.find(ArrowBack).exists()).to.equal(true);
  });

  it('should render ArrowBack with custom clickHandler on step 2', function() {
    this.wrapper.setState({signupStep: 2});
    const arrow = this.wrapper.find(ArrowBack);
    expect(arrow.exists()).to.equal(true);
    expect(arrow.prop('clickHandler')).to.equal(this.wrapper.instance().goBack);
  });

  it('should set step 1 on goBack()', function() {
    this.wrapper.setState({signupStep: 2});
    this.wrapper.instance().goBack();
    expect(this.wrapper.state('signupStep')).to.equal(1);
  });

  it('should not validate empty values on step 1', function() {
    const errors = this.wrapper.instance().validateError1({
      email: '',
      password: '',
      password2: '',
      terms_agree: false
    });
    expect(errors.email).to.equal('Please type your email.');
    expect(errors.password).to.equal('Please type your password twice.');
    expect(errors.terms_agree).to.equal('You must accept Terms of Use to sign up.');
  });

  it('should not validate non-email on step 1', function() {
    const errors = this.wrapper.instance().validateError1({
        email: 'username',
        password: 'P@ssw0rd',
        password2: 'P@ssw0rd',
        terms_agree: true
    });
    expect(errors.email).to.equal('Oops... There\'s a mistake. Please type a valid email.');
  });

  it('should not validate not matching passwords on step 1', function() {
    const errors = this.wrapper.instance().validateError1({
        email: 'user@example.com',
        password: 'P@ssw0rd',
        password2: 'Password',
        terms_agree: true
    });
    expect(errors.password2).to.equal('Oops... Passwords didn\'t match.');
  });

  it('should validate correct values on step 1', function() {
    const errors = this.wrapper.instance().validateError1({
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true
    });
    expect(errors.email).to.equal(null);
    expect(errors.password).to.equal(null);
    expect(errors.password2).to.equal(null);
    expect(errors.terms_agree).to.equal(null);
  });

  it('should not validate empty values on step 2', function() {
    const errors = this.wrapper.instance().validateError2({
      first_name: '',
      last_name: '',
      username: '',
      phone: ''
    });
    expect(errors.first_name).to.equal('Please type your first name 2-30 characters long.');
    expect(errors.username).to.equal('Please type your name on the site 2-30 characters long.');
    expect(errors.phone).to.equal('Please type a valid phone number.');
  });

  it('should not validate empty too long last name on step 2', function() {
    const errors = this.wrapper.instance().validateError2({
      first_name: 'Useriy',
      last_name: 'UserenkoUserenkoUserenkoUserenko',
      username: 'username',
      phone: '+380980123456'
    });
    expect(errors.last_name).to.equal('Max length of last name is 30 characters.');
  });

  it('should validate correct values on step 2', function() {
    const errors = this.wrapper.instance().validateError2({
      first_name: 'Useriy',
      last_name: 'Userenko',
      username: 'username',
      phone: '+380980123456'
    });
    expect(errors.first_name).to.equal(null);
    expect(errors.last_name).to.equal(null);
    expect(errors.username).to.equal(null);
    expect(errors.phone).to.equal(null);
  });
});


describe('Signup form submit 1', function() {
  beforeEach(function() {
    this.wrapper = shallow(<Signup />);
    this.fakeGet = sinon.stub(rest, 'get');
  });

  afterEach(function() {
    this.fakeGet.restore();
  });

  it('should submit form successfully', function(done) {
    const values = {
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true
    };
    const promise = Promise.resolve({data: {email_exists: false}});
    this.fakeGet.returns(promise);
    this.wrapper.instance().onSubmit1(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakeGet.calledWith('users/check_email/?email=user@example.com')).to.equal(true);
    promise.then(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('formValues')).to.deep.equal({
          email: 'user@example.com',
          password: 'P@ssw0rd'
      });
      expect(this.wrapper.state('signupStep')).to.equal(2);
      done();
    });
  });

  it('should handle existing email', function(done) {
    const values = {
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true
    };
    const promise = Promise.resolve({data: {email_exists: true}});
    this.fakeGet.returns(promise);
    this.wrapper.instance().onSubmit1(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakeGet.calledWith('users/check_email/?email=user@example.com')).to.equal(true);
    promise.then(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitErrors').email).to.equal('That email already exists.');
      done();
    });
  });

  it('should handle submit error', function(done) {
    const promise = Promise.reject({response: {data: 'error'}});
    const values = {
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true
    };
    this.fakeGet.returns(promise);
    this.wrapper.instance().onSubmit1(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakeGet.calledWith('users/check_email/?email=user@example.com')).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitErrors').common).to.equal('Oops! Something went wrong. Please try again in a moment.');
      done();
    });
  });
});


describe('Signup form submit 2', function() {
  beforeEach(function() {
    this.wrapper = shallow(<Signup />);
    this.wrapper.setState({signupStep: 2, formValues: {
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true
    }});
    this.fakePost = sinon.stub(rest, 'post');
    this.fakeRedirect = sinon.stub(utils, 'redirect');
  });

  afterEach(function() {
    this.fakePost.restore();
    this.fakeRedirect.restore();
  });

  it('should submit form successfully', function(done) {
    const values = {
      first_name: 'Useriy',
      last_name: 'Userenko',
      username: 'username',
      phone: '+380980123456'
    };
    const promise = Promise.resolve({});
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit2(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('users/', {
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true,
      first_name: 'Useriy',
      last_name: 'Userenko',
      username: 'username',
      phone: '+380980123456'
    })).to.equal(true);
    promise.then(() => {
      expect(this.fakeRedirect.calledWith('/')).to.equal(true);
      done();
    });
  });

  it('should handle unknown submit error', function(done) {
    const promise = Promise.reject({response: {data: 'error'}});
    const values = {
      first_name: 'Useriy',
      last_name: 'Userenko',
      username: 'username',
      phone: '+380980123456'
    };
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit2(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('users/', {
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true,
      first_name: 'Useriy',
      last_name: 'Userenko',
      username: 'username',
      phone: '+380980123456'
    })).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitErrors').common).to.equal('Oops! Something went wrong. Please try again in a moment.');
      done();
    });
  });

  it('should handle known submit error', function(done) {
    const promise = Promise.reject({response: {data: {username: 'Username error'}}});
    const values = {
      first_name: 'Useriy',
      last_name: 'Userenko',
      username: 'username',
      phone: '+380980123456'
    };
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit2(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('users/', {
      email: 'user@example.com',
      password: 'P@ssw0rd',
      password2: 'P@ssw0rd',
      terms_agree: true,
      first_name: 'Useriy',
      last_name: 'Userenko',
      username: 'username',
      phone: '+380980123456'
    })).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitErrors').username).to.equal('Username error');
      done();
    });
  });
});
