import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import Login from 'apps/users/containers/login';


describe('Login component', function() {
  it('should have correct class', function() {
    const wrapper = mount(<Login />);
    expect(wrapper.find('.login-signup').exists()).to.equal(true);
  });
});
