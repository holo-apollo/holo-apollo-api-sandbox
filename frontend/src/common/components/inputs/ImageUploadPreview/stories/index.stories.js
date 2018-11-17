import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import ImageUploadPreview from '../index';

const helpText = (
  <Fragment>
    <p>At least 5 and at most 30 photos, total size up to 150MB.</p>
    <p>
      Photos will be used in a collage, therefore some of them should have
      minimal, neutral background.
    </p>
  </Fragment>
);

storiesOf('Inputs', module).add('ImageUploadPreview', () => (
  <div style={{ width: '420px' }}>
    <ImageUploadPreview
      buttonText={text('Button text', 'Upload photos')}
      name="images"
      helpText={helpText}
    />
  </div>
));
