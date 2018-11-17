import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import palette from 'common/palette';

const skBounce = keyframes`
  0%, 100% { transform: scale(0.0); }
  50% { transform: scale(1.0); }
`;

const getSpinnerStyles = ({ size }) => css`
  width: ${size}px;
  height: ${size}px;
`;

const Spinner = styled.div`
  position: relative;

  ${getSpinnerStyles};
`;

const getDoubleBounceStyles = ({ color, index }) => css`
  background-color: ${color};
  ${index === 1 && 'animation-delay: -1.0s;'}
`;

const DoubleBounce = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${skBounce} 2s infinite ease-in-out;

  ${getDoubleBounceStyles};
`;

const DoubleBounceSpinner = ({ color, size }) => (
  <Spinner size={size}>
    <DoubleBounce color={color} index={0} />
    <DoubleBounce color={color} index={1} />
  </Spinner>
);

DoubleBounceSpinner.defaultProps = {
  color: palette.blue,
  size: 40,
};

export default DoubleBounceSpinner;
