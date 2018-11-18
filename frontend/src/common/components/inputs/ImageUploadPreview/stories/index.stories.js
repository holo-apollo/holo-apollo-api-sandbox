import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import ImageUploadPreview from '../index';

const helperText = (
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
      label={text('Label text', 'Upload photos of your goods in good quality')}
      buttonText={text('Button text', 'Upload photos')}
      errorText={text('Error text', '')}
      name="images"
      helperText={helperText}
    />
  </div>
));
