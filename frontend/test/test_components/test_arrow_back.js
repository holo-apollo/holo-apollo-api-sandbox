import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { ArrowBack } from 'apps/users/components/arrow_back';

describe('Signup component', function() {
  beforeEach(function() {
    this.wrapper = shallow(<ArrowBack />);
  });

  it('should have correct class', function() {
    expect(this.wrapper.find('.arrow-back').exists()).to.equal(true);
  });

  it('should go back in history by default', function() {
    const spy = sinon.spy(window.history, 'back');
    this.wrapper.simulate('click');
    expect(spy.called).to.equal(true);
  });

  it('should call custom click handler', function() {
    let handlerCalled = false;
    const wrapper = shallow(
      <ArrowBack
        clickHandler={() => {
          handlerCalled = true;
        }}
      />
    );
    wrapper.simulate('click');
    expect(handlerCalled).to.equal(true);
  });
});
