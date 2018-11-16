import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';

import Checkbox from '../index';


storiesOf('Inputs', module).add('Checkbox', () => (
  <Checkbox
    labelText={text('Label text', 'I agree to something')}
    errorText={text('Error text', 'Something went wrong')}
    size={number('Size', 30)}
  />
));
