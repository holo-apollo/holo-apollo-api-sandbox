import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import TextField from '../index';

storiesOf('Inputs', module).add('TextField', () => (
  <div style={{ width: '420px' }}>
    <TextField
      label={text('Label text', 'What is your name?')}
      errorText={text('Error text', '')}
      multiline={boolean('Multiline', false)}
      name="name"
    />
  </div>
));
