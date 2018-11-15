import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';

import '../../../../../../static/css/base1.css';
import '../../../../../../static/css/auth1.css';
import '../../../../../../static/css/hover.css';

import { Button, FacebookButton } from '../index';


storiesOf('Old components', module).add('Button', () => (
  <Button
    children={text('Text', 'Button text')}
    color={select('Color', ['black', 'blue'])}
  />
));

storiesOf('Old components', module).add('FacebookButton', () => (
  <FacebookButton signup={boolean('Signup', false)}/>
));
