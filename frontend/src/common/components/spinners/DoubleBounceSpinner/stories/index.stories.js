import React from 'react';
import { storiesOf } from '@storybook/react';
import { color, number } from '@storybook/addon-knobs';

import palette from 'common/palette';
import DoubleBounceSpinner from '../index';

storiesOf('Spinners', module).add('DoubleBounceSpinner', () => (
  <DoubleBounceSpinner
    color={color('Color', palette.blue)}
    size={number('Size', 40)}
  />
));
