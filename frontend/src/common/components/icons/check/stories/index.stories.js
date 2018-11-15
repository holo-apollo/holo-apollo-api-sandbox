import React from 'react';
import { storiesOf } from '@storybook/react';
import { color } from '@storybook/addon-knobs';

import Check from '../index';


storiesOf('Icons', module).add('Check', () => (
  <Check
    height={30}
    color={color('Color', '#07bce9')}
  />
));
