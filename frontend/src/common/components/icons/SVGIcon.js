import React from 'react';
import styled from 'styled-components';

const StyledSVG = styled.svg`
  display: block;
`;

const getSrcWidth = vBox => vBox.width;

const getSrcHeight = vBox => vBox.height;

const calcWidth = (vBox, width, height) => {
  if (width !== undefined) return width;
  if (height === undefined) return 0;

  const srcWidth = getSrcWidth(vBox);
  const srcHeight = getSrcHeight(vBox);
  return srcWidth * (height / srcHeight);
};

const calcHeight = (vBox, width, height) => {
  if (height !== undefined) return height;
  if (width === undefined) return 0;

  const srcWidth = getSrcWidth(vBox);
  const srcHeight = getSrcHeight(vBox);
  return srcHeight * (width / srcWidth);
};

const SVGIcon = ({ vBox, width, height, color, children }) => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`${vBox.minX} ${vBox.minY} ${vBox.width} ${vBox.height}`}
    width={calcWidth(vBox, width, height)}
    height={calcHeight(vBox, width, height)}
    fill={color}
  >
    {children}
  </StyledSVG>
);

export default SVGIcon;
