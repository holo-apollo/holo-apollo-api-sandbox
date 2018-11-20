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
  text-align: left;

  ${getLabelStyles};
`;

const getCheckboxStyles = ({ size }) => css`
  width: ${size}px;
  height: ${size}px;
  min-width: ${size}px;
  max-width: ${size}px;

  &:checked {
    background-size: ${(size * 2) / 3}px ${(size * 2) / 3}px;
  }
`;

export const StyledCheckbox = styled.input`
  appearance: none;
  box-sizing: content-box;
  border: solid 1px ${palette.lightGrey};
  margin: 0 8px 0 0;
  padding: 0;
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
