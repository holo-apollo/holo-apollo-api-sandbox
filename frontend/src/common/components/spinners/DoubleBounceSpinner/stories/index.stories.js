import React from 'react';
import { storiesOf } from '@storybook/react';
import { color, number } from '@storybook/addon-knobs';

import DoubleBounceSpinner from '../index';

storiesOf('Spinners', module).add('DoubleBounceSpinner', () => (
  <DoubleBounceSpinner
    color={color('Color', '#1bc9de')}
    size={number('Size', 40)}
  />
));
