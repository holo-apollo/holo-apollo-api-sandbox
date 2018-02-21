import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {Button} from 'common/components/buttons';


describe('Button component', function() {
  it('should render button with default props', function() {
    const wrapper = mount(<Button />);
    expect(wrapper.childAt(0).hasClass('lg black hvr-bounce-to-left')).to.equal(true);
    expect(wrapper.childAt(0).prop('type')).to.equal('button');
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
    expect(wrapper.childAt(0).hasClass('md white foo')).to.equal(true);
    expect(wrapper.childAt(0).prop('type')).to.equal('submit');
  });
});
