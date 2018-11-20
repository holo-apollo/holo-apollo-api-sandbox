// @flow
import styled, { css } from 'styled-components';

import palette from 'common/palette';

const getHelperStyles = ({ hasHelperText }: { hasHelperText: boolean }) => css`
  justify-content: ${hasHelperText ? 'space-between' : 'flex-end'};
`;

export const HelperCont = styled.span`
  width: 100%;
  display: flex;
  align-items: center;

  ${getHelperStyles};
`;

export const CounterCont = styled.span`
  color: ${palette.grey};
`;
