import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import '../../../../../../static/css/base1.css';
import '../../../../../../static/css/auth1.css';
import '../../../../../../static/css/hover.css';

import { Button } from '../index';


// TODO: add more props
storiesOf('Common', module).add('Button', () => (
  <Button
    children={text('Text', 'Button text')}
  />
));
