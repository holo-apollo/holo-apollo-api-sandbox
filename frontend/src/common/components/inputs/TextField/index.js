import React from 'react';
import TextFieldMaterial from '@material-ui/core/TextField';

const TextField = props => (
  <TextFieldMaterial
    {...props}
    fullWidth={true}
    InputLabelProps={{ style: { fontSize: '12px' } }}
  />
);

TextField.defaultProps = {
  error: false,
  multiline: false,
};

export default TextField;
