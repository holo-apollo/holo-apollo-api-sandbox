import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormStep from '../index';

storiesOf('Navigation', module).add('FormStep', () => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '210px' }}>
      <FormStep
        isCurrent={true}
        isDisabled={false}
        header="Step 1"
        helpText="current"
        onClick={action('Step 1 click')}
      />
    </div>
    <div style={{ width: '210px' }}>
      <FormStep
        isCurrent={false}
        isDisabled={false}
        header="Step 2"
        helpText="clickable"
        onClick={action('Step 2 click')}
      />
    </div>
    <div style={{ width: '210px' }}>
      <FormStep
        isCurrent={false}
        isDisabled={true}
        header="Step 3"
        helpText="disabled"
        onClick={action('Step 3 click')}
      />
    </div>
  </div>
));
