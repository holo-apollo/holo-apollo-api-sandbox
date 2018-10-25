import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../example_components';


storiesOf('Examples', module).add('Button', () => (
  <Button clickHandler={action('click')}>Click me</Button>
));
