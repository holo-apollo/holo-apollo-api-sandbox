// @flow
import React from 'react';

import FieldWithError from '../FieldWithError';
import { StyledLabel, StyledCheckbox } from './styled';

type Props = {
  name: string,
  label: string,
  errorText?: string,
  size: number,
};

const Checkbox = ({ name, label, errorText, size, ...rest }: Props) => (
  <FieldWithError errorText={errorText}>
    <StyledLabel error={Boolean(errorText)}>
      <StyledCheckbox size={size} type="checkbox" name={name} {...rest} />
      {label}
    </StyledLabel>
  </FieldWithError>
);

Checkbox.defaultProps = {
  size: 20,
};

export default Checkbox;
