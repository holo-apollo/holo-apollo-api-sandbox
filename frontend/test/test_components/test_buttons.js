import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { Button } from 'common/old_components/buttons';


describe('Button component', function() {
  it('should render button with default props', function() {
    const wrapper = mount(<Button />);
    expect(wrapper.childAt(0).hasClass('btn lg black hvr-bounce-to-left')).to.equal(true);
  });

  it('should render button with provided props', function() {
    const wrapper = mount(
        <Button
            size={'md'}
            type={'submit'}
            color={'white'}
            hover={'foo'}
        />
    );
    expect(wrapper.childAt(0).hasClass('btn md white foo')).to.equal(true);
    expect(wrapper.childAt(0).prop('type')).to.equal('submit');
  });
});
