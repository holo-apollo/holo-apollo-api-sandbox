import React from 'react';
import TextFieldMaterial from '@material-ui/core/TextField';

import FieldWithError from '../FieldWithError';

const TextField = ({ errorText, ...rest }) => (
  <FieldWithError errorText={errorText}>
    <TextFieldMaterial
      {...rest}
      fullWidth={true}
      error={Boolean(errorText)}
      inputProps={{ ...rest.inputProps, maxLength: rest.maxLength }}
      InputLabelProps={{ style: { fontSize: '12px' } }}
      FormHelperTextProps={{ style: { fontSize: '10px' } }}
    />
  </FieldWithError>
);

export default TextField;
