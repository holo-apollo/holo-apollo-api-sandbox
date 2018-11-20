import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Select from '../index';

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

storiesOf('Inputs', module).add('Select', () => (
  <div style={{ width: '420px' }}>
    <Select
      label={text('Label text', 'Choose option')}
      errorText={text('Error text', '')}
      name="name"
      options={options}
    />
  </div>
));
