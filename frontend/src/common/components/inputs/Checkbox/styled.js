// @flow
import styled, { css } from 'styled-components';

import palette from 'common/palette';
import CheckIcon from './checkbox.svg';

const getLabelStyles = ({ error }: { error: boolean }) => css`
  color: ${error ? palette.red : palette.grey};
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;

  ${getLabelStyles};
`;

const getCheckboxStyles = ({ size }) => css`
  width: ${size}px;
  height: ${size}px;

  &:checked {
    background-size: ${(size * 2) / 3}px ${(size * 2) / 3}px;
  }
`;

export const StyledCheckbox = styled.input`
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
