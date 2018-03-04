import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import {PasswordResetConfirm} from 'apps/users/containers/password_reset_confirm';
import {DoubleBounceSpinner} from 'common/components/spinners';
import * as rest from 'helpers/rest';


window.django_data.urls.passwordResetConfirmAPI = 'rest-auth/password/reset/confirm/';


describe('PasswordResetConfirm component', function() {
  beforeEach(function() {
    this.wrapper = shallow(<PasswordResetConfirm />);
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
    expect(this.wrapper.find('.password-reset-confirm-form').exists()).to.equal(true);
    expect(this.wrapper.find('.password-reset-confirm-form .hidden').exists()).to.equal(false);
  });

  it('should hide form when pending', function() {
    this.wrapper.setState({submitPending: true});
    expect(this.wrapper.find('.password-reset-confirm-form .hidden').exists()).to.equal(true);
  });

  it('should hide form on success', function() {
    this.wrapper.setState({submitSuccess: true});
    expect(this.wrapper.find('.password-reset-confirm-form .hidden').exists()).to.equal(true);
  });

  it('should not validate empty values', function() {
    const errors = this.wrapper.instance().validateError({
      new_password1: '',
      new_password2: ''
    });
    expect(errors.new_password1).to.equal('Please type your password twice.');
  });

  it('should not validate not matching passwords on step 1', function() {
    const errors = this.wrapper.instance().validateError({
      new_password1: 'P@ssw0rd',
      new_password2: 'Password'
    });
    expect(errors.new_password2).to.equal('Oops... Passwords didn\'t match.');
  });

  it('should validate correct passwords', function() {
    const errors = this.wrapper.instance().validateError({
      new_password1: 'P@ssw0rd',
      new_password2: 'P@ssw0rd'
    });
    expect(errors.new_password1).to.equal(null);
    expect(errors.new_password2).to.equal(null);
  });

  it('should set submit errors to null during validation', function() {
    this.wrapper.setState({submitErrors: {
      new_password1: 'error1',
      new_password2: 'error2'
    }});
    expect(this.wrapper.state('submitErrors').new_password1).to.equal('error1');
    this.wrapper.instance().validateError({
      new_password1: 'P@ssw0rd',
      new_password2: 'P@ssw0rd'
    });
    expect(this.wrapper.state('submitErrors').new_password1).to.equal(null);
  });
});


describe('Password reset form submit', function() {
  beforeEach(function() {
    this.wrapper = shallow(<PasswordResetConfirm />);
    this.fakePost = sinon.stub(rest, 'post');
  });

  afterEach(function() {
    this.fakePost.restore();
  });

  it('should submit form successfully', function(done) {
    const values = {
      new_password1: 'P@ssw0rd',
      new_password2: 'P@ssw0rd'
    };
    const promise = Promise.resolve({});
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('rest-auth/password/reset/confirm/', values)).to.equal(true);
    promise.then(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitSuccess')).to.equal(true);
      done();
    });
  });

  it('should handle unknown submit error', function(done) {
    const promise = Promise.reject({response: {data: 'error'}});
    const values = {
      new_password1: 'P@ssw0rd',
      new_password2: 'P@ssw0rd'
    };
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('rest-auth/password/reset/confirm/', values)).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitErrors').common).to.equal('Oops! Something went wrong. Please try again in a moment.');
      done();
    });
  });

  it('should handle known submit error', function(done) {
    const promise = Promise.reject({response: {data: {new_password1: 'Known error'}}});
    const values = {
      new_password1: 'P@ssw0rd',
      new_password2: 'P@ssw0rd'
    };
    this.fakePost.returns(promise);
    this.wrapper.instance().onSubmit(values);
    expect(this.wrapper.state('submitPending')).to.equal(true);
    expect(this.fakePost.calledWith('rest-auth/password/reset/confirm/', values)).to.equal(true);
    promise.then(() => {}).catch(() => {
      expect(this.wrapper.state('submitPending')).to.equal(false);
      expect(this.wrapper.state('submitErrors').new_password1).to.equal('Known error');
      done();
    });
  });
});
