import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import Checkbox from '../index';

storiesOf('Inputs', module).add('Checkbox', () => (
  <div style={{ width: '420px' }}>
    <Checkbox
      label={text('Label text', 'I agree to something')}
      errorText={text('Error text', '')}
      size={number('Size', 20)}
    />
  </div>
));
