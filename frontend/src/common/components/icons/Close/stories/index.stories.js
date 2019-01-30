import React from 'react';
import { storiesOf } from '@storybook/react';
import { color, number } from '@storybook/addon-knobs';

import palette from 'common/palette';
import Close from '../index';

storiesOf('Icons', module).add('Close', () => (
  <Close
    height={number('Height', 30)}
    color={color('Color', palette.darkGrey)}
  />
));
