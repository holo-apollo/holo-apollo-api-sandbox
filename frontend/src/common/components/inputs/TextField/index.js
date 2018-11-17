import React from 'react';
import TextFieldMaterial from '@material-ui/core/TextField';

const TextField = props => <TextFieldMaterial {...props} fullWidth={true} />;

TextField.defaultProps = {
  error: false,
  multiline: false,
};

export default TextField;
