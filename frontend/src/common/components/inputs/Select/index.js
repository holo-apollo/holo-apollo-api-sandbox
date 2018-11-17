// @flow
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SelectMaterial from '@material-ui/core/Select';

type Option = {
  value: any,
  label: string,
};

type Props = {
  options: Option[],
  label: string,
};

const Select = ({ label, options, ...rest }: Props) => (
  <FormControl fullWidth={true}>
    <InputLabel style={{ fontSize: 12 }}>{label}</InputLabel>
    <SelectMaterial native={true} defaultValue={''} {...rest}>
      <option value={''} disabled={true} />
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectMaterial>
  </FormControl>
);

export default Select;
