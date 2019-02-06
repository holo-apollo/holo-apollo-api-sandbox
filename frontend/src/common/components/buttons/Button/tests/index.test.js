import React from 'react';
import { mount } from 'enzyme';

import Button from '../index';

describe('Button', function() {
  it('should render normally', function() {
    const wrapper = mount(<Button>Button text</Button>);
    expect(wrapper.contains('Button text')).toBe(true);
  });
});
