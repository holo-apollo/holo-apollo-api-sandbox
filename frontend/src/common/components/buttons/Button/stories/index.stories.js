import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, color } from '@storybook/addon-knobs';

import palette from 'common/palette';
import Button from '../index';

storiesOf('Buttons', module).add('Button', () => (
  <Button
    width={250}
    type={'button'}
    color={color('Main color', palette.darkGrey)}
    hoverColor={color('Hover color', palette.blue)}
  >
    {text('Text', 'Button text')}
  </Button>
));
