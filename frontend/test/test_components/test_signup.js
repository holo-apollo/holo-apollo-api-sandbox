import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import Signup from 'apps/users/containers/signup';


describe('Signup component', function() {
  it('should have correct class', function() {
    const wrapper = mount(<Signup />);
    expect(wrapper.childAt(0).hasClass('login-signup')).to.equal(true);
  });
});
