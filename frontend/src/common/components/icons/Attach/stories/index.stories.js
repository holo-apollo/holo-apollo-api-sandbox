import React from 'react';
import { storiesOf } from '@storybook/react';
import { color, number } from '@storybook/addon-knobs';

import palette from 'common/palette';
import Attach from '../index';

storiesOf('Icons', module).add('Attach', () => (
  <Attach height={number('Height', 30)} color={color('Color', palette.blue)} />
));
