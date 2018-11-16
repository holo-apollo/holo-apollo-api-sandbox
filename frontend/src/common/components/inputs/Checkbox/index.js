import React from 'react';
import styled, { css } from 'styled-components';

import CheckIcon from './checkbox.svg';


const Cont = styled.div``;

const FieldCont = styled.div`
  display: flex;
  align-items: center;
`;

const getCheckboxStyles = ({ size }) => css`
  width: ${size}px;
  height: ${size}px;

  &:checked {
    background-size: ${size * 2 / 3}px ${size * 2 / 3}px;
  }
`;

const StyledCheckbox = styled.input`
  -webkit-appearance: none;
  border: solid 1px #c6c6c6;
  margin-right: 8px;

  &:focus, &:active {
    outline: none;
  }

  &:checked {
    background-image: url(${CheckIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 18px 13px;
    background-color: #ffffff;
  }

  ${getCheckboxStyles};
`;

const ErrorCont = styled.div`
  margin-top: 17px;
  color: #f57575;
  text-align: center;
  font-size: 10px;
`;


const Checkbox = ({ field, labelText, errorText, size }) => (
  <Cont>
    <FieldCont>
      <StyledCheckbox size={size} type="checkbox" id={field} name={field} />
      <label htmlFor={field}>{labelText}</label>
    </FieldCont>
    {errorText && <ErrorCont>* {errorText}</ErrorCont>}
  </Cont>
);

export default Checkbox;
