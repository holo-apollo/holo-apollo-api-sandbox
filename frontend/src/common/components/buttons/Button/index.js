import React from 'react';
import styled, { css } from 'styled-components';

import palette from 'common/palette';

const getButtonProps = ({ width, height, color, fontSize, fontWeight }) => css`
  width: ${width}px;
  min-width: ${width}px;
  height: ${height}px;
  line-height: ${height}px;
  background-color: ${color};
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
`;

const getHoverProps = ({ hoverColor }) => css`
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
  transition-property: background-color;
  transition-duration: 0.5s;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${hoverColor};
    transform: scaleX(0);
    transform-origin: 100% 50%;
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
  }

  &:hover,
  &:focus,
  &:active {
    color: white;
    border: none;

    &:before {
      transform: scaleX(1);
      transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
    }
  }
`;

const StyledButton = styled.button`
  font-weight: 500;
  text-align: center;
  color: ${palette.white};
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 0;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  ${getButtonProps};
  ${getHoverProps};
`;

const Button = props => <StyledButton {...props} />;

Button.defaultProps = {
  color: palette.darkGrey,
  hoverColor: palette.blue,
  height: 35,
  fontSize: 14,
  fontWeight: '500',
};

export default Button;
