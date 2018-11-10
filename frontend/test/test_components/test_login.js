import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import {Login} from 'apps/users/containers/login';
import {DoubleBounceSpinner} from 'common/components/spinners';
import ArrowBack from 'apps/users/components/arrow_back';
import * as rest from 'helpers/rest';
import * as utils from 'helpers/utils';


window.django_data.urls.loginAPI = 'users/login/';


describe('Login component', function() {
  beforeEach(function() {
    this.wrapper = shallow(<Login />);
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

  it('should render form', function() {
    expect(this.wrapper.find('.login-form').exists()).to.equal(true);
  });

  it('should hide form when pending', function() {
    this.wrapper.setState({submitPending: true});
    expect(this.wrapper.find('.login-form.hidden').exists()).to.equal(true);
  });

  it('should render ArrowBack', function() {
    expect(this.wrapper.find(ArrowBack).exists()).to.equal(true);
  });

  it('should not validate empty values', function() {
    const errors = this.wrapper.instance().validateError({username: '', password: ''});
    expect(errors.username).to.equal('Please type your email or phone.');
    expect(errors.password).to.equal('Please type your password.');
  });

  it('should not validate non-email and non-phone', function() {
    const errors = this.wrapper.instance().validateError({
        username: 'username',
        password: 'P@ssw0rd'
    });
    expect(errors.username).to.equal('Oops... There\'s a mistake. Please type a valid email or phone.');
    expect(errors.password).to.equal(null);
  });

  it('should validate correct email', function() {
    const errors = this.wrapper.instance().validateError({
        username: 'user@example.com',
        password: 'P@ssw0rd'
    });
    expect(errors.username).to.equal(null);
    expect(errors.password).to.equal(null);
  });

  it('should validate correct phone', function() {
    const errors = this.wrapper.instance().validateError({
        username: '+380991234567',
        password: 'P@ssw0rd'
    });
    expect(errors.username).to.equal(null);
    expect(errors.password).to.equal(null);
  });

  it('should set submit error to null during validation', function() {
    this.wrapper.setState({submitError: 'some error'});
    expect(this.wrapper.state('submitError')).to.equal('some error');
    this.wrapper.instance().validateError({
        username: '+380991234567',
        password: 'P@ssw0rd'
    });
    expect(this.wrapper.state('submitError')).to.equal(null);
  });
});


describe('Login form submit', function() {
  beforeEach(function() {
    this.wrapper = shallow(<Login />);
    this.fakePost = sinon.stub(rest, 'post');
    this.fakeRedirect = sinon.stub(utils, 'redirect');
  });

  afterEach(function() {
    this.fakePost.restore();
    this.fakeRedirect.restore();
  });

  it('should submit form successfully', function(done) {
    const values = {
        username: '+380991234567',
        password: 'P@ssw0rd'
    };
    const promise = Promise.resolve({});
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('users/login/', values)).to.equal(true);
    promise.then(() => {
      expect(this.fakeRedirect.calledWith('/')).to.equal(true);
      done();
    });
  });

  it('should handle unknown submit error', function(done) {
    const promise = Promise.reject({response: {data: 'error'}});
    const values = {
        username: '+380991234567',
        password: 'P@ssw0rd'
    };
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('users/login/', values)).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitError')).to.equal('* Oops! Something went wrong. Please try again in a moment.');
      done();
    });
  });

  it('should handle known submit error', function(done) {
    const promise = Promise.reject({response: {data: {detail: 'Known error'}}});
    const values = {
        username: '+380991234567',
        password: 'P@ssw0rd'
    };
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('users/login/', values)).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitError')).to.equal('* Known error');
      done();
    });
  });
});
