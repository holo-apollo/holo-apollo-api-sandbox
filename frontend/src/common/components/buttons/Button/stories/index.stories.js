import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, color } from '@storybook/addon-knobs';

import Button from '../index';


storiesOf('Buttons', module).add('Button', () => (
  <Button
    width={250}
    type={'button'}
    color={color('Main color', '#424242')}
    hoverColor={color('Hover color', '#1bc9de')}
  >
    {text('Text', 'Button text')}
  </Button>
));
