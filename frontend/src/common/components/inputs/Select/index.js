// @flow
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SelectMaterial from '@material-ui/core/Select';

import type { SelectOption } from 'common/types';
import FieldWithError from '../FieldWithError';

type Props = {
  options: SelectOption<any>[],
  label: string,
  errorText?: string,
};

const Select = ({ label, options, errorText, ...rest }: Props) => (
  <FieldWithError errorText={errorText}>
    <FormControl fullWidth={true} error={Boolean(errorText)}>
      <InputLabel error={Boolean(errorText)} style={{ fontSize: 12 }}>
        {label}
      </InputLabel>
      <SelectMaterial native={true} defaultValue={''} {...rest}>
        <option value={''} disabled={true} />
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectMaterial>
    </FormControl>
  </FieldWithError>
);

export default Select;
