import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import {PasswordReset} from 'apps/users/containers/password_reset';
import {DoubleBounceSpinner} from 'common/components/spinners';
import ArrowBack from 'apps/users/components/arrow_back';
import * as rest from 'helpers/rest';


window.django_data.urls.passwordResetAPI = 'rest-auth/password/reset/';


describe('PasswordReset component', function() {
  beforeEach(function() {
    this.wrapper = shallow(<PasswordReset />);
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

  it('should not show success message', function() {
    expect(this.wrapper.find('.subtitle').exists()).to.equal(false);
  });

  it('should show success message on success', function() {
    this.wrapper.setState({submitSuccess: true});
    expect(this.wrapper.find('.subtitle').exists()).to.equal(true);
  });

  it('should render form', function() {
    expect(this.wrapper.find('.password-reset-form').exists()).to.equal(true);
    expect(this.wrapper.find('.password-reset-form .hidden').exists()).to.equal(false);
  });

  it('should hide form when pending', function() {
    this.wrapper.setState({submitPending: true});
    expect(this.wrapper.find('.password-reset-form .hidden').exists()).to.equal(true);
  });

  it('should hide form on success', function() {
    this.wrapper.setState({submitSuccess: true});
    expect(this.wrapper.find('.password-reset-form .hidden').exists()).to.equal(true);
  });

  it('should render ArrowBack', function() {
    expect(this.wrapper.find(ArrowBack).exists()).to.equal(true);
  });

  it('should not validate empty email', function() {
    const errors = this.wrapper.instance().validateError({email: ''});
    expect(errors.email).to.equal('Please type your email.');
  });

  it('should not validate non-email', function() {
    const errors = this.wrapper.instance().validateError({email: 'username'});
    expect(errors.email).to.equal('Oops... There\'s a mistake. Please type a valid email.');
  });

  it('should validate correct email', function() {
    const errors = this.wrapper.instance().validateError({email: 'user@example.com'});
    expect(errors.email).to.equal(null);
  });

  it('should set submit error to null during validation', function() {
    this.wrapper.setState({submitError: 'some error'});
    expect(this.wrapper.state('submitError')).to.equal('some error');
    this.wrapper.instance().validateError({email: 'user@example.com'});
    expect(this.wrapper.state('submitError')).to.equal(null);
  });
});


describe('Password reset form submit', function() {
  beforeEach(function() {
    this.wrapper = shallow(<PasswordReset />);
    this.fakePost = sinon.stub(rest, 'post');
  });

  afterEach(function() {
    this.fakePost.restore();
  });

  it('should submit form successfully', function(done) {
    const values = {email: 'user@example.com'};
    const promise = Promise.resolve({});
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('rest-auth/password/reset/', values)).to.equal(true);
    promise.then(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitSuccess')).to.equal(true);
      done();
    });
  });

  it('should handle unknown submit error', function(done) {
    const promise = Promise.reject({response: {data: 'error'}});
    const values = {email: 'user@example.com'};
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('rest-auth/password/reset/', values)).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitSuccess')).to.equal(false);
      expect(this.wrapper.state('submitError')).to.equal('* Oops! Something went wrong. Please try again in a moment.');
      done();
    });
  });

  it('should handle known submit error', function(done) {
    const promise = Promise.reject({response: {data: {detail: 'Known error'}}});
    const values = {email: 'user@example.com'};
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('rest-auth/password/reset/', values)).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitSuccess')).to.equal(false);
      expect(this.wrapper.state('submitError')).to.equal('* Known error');
      done();
    });
  });
});
