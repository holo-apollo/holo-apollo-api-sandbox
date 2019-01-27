import React from 'react';
import { storiesOf } from '@storybook/react';

import FormStep from '../index';

storiesOf('Navigation', module).add('FormStep', () => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '210px' }}>
      <FormStep
        isCurrent={true}
        isDisabled={false}
        header="Step 1"
        helpText="current"
      />
    </div>
    <div style={{ width: '210px' }}>
      <FormStep
        isCurrent={false}
        isDisabled={false}
        header="Step 2"
        helpText="clickable"
      />
    </div>
    <div style={{ width: '210px' }}>
      <FormStep
        isCurrent={false}
        isDisabled={true}
        header="Step 3"
        helpText="disabled"
      />
    </div>
  </div>
));
