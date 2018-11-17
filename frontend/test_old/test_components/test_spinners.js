import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { DoubleBounceSpinner } from 'common/old_components/spinners';

describe('DoubleBounceSpinner component', function() {
  it('should have correct classes', function() {
    const wrapper = mount(<DoubleBounceSpinner />);
    expect(wrapper.childAt(0).hasClass('spinner')).to.equal(true);
    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .hasClass('double-bounce1')
    ).to.equal(true);
    expect(
      wrapper
        .childAt(0)
        .childAt(1)
        .hasClass('double-bounce2')
    ).to.equal(true);
  });
});
