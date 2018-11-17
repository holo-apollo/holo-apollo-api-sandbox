import React from 'react';
import styled, { css } from 'styled-components';

const getButtonProps = ({ width, color }) => css`
  width: ${width}px;
  background-color: ${color};
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
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
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
  color: '#424242',
  hoverColor: '#1bc9de',
};

export default Button;
