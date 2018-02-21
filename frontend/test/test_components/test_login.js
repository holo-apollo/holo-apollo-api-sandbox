import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import Login from 'apps/users/containers/login';


describe('Login component', function() {
  it('has correct class', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.childAt(0).hasClass('login-signup')).to.equal(true);
  });
});
