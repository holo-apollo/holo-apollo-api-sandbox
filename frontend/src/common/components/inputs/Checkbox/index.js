import React from 'react';
import styled, { css } from 'styled-components';

import palette from 'common/palette';
import CheckIcon from './checkbox.svg';

const Cont = styled.div``;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const getCheckboxStyles = ({ size }) => css`
  width: ${size}px;
  height: ${size}px;

  &:checked {
    background-size: ${(size * 2) / 3}px ${(size * 2) / 3}px;
  }
`;

const StyledCheckbox = styled.input`
  -webkit-appearance: none;
  border: solid 1px ${palette.lightGrey};
  margin-right: 8px;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
  }

  &:checked {
    background-image: url(${CheckIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 18px 13px;
    background-color: ${palette.white};
  }

  ${getCheckboxStyles};
`;

const ErrorCont = styled.div`
  margin-top: 17px;
  color: ${palette.red};
  text-align: center;
  font-size: 10px;
`;

const Checkbox = ({ name, labelText, errorText, size }) => (
  <Cont>
    <StyledLabel>
      <StyledCheckbox size={size} type="checkbox" name={name} />
      {labelText}
    </StyledLabel>
    {errorText && <ErrorCont>* {errorText}</ErrorCont>}
  </Cont>
);

Checkbox.defaultProps = {
  size: 20,
};

export default Checkbox;
