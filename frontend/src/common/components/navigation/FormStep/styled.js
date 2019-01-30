// @flow
import styled, { css } from 'styled-components';
import palette from 'common/palette';

type StyledProps = {
  isCurrent: boolean,
  isDisabled: boolean,
};

const getContStyles = ({ isCurrent, isDisabled }: StyledProps) => css`
  background-color: ${isCurrent ? palette.evening : palette.lightestGrey};
  color: ${isCurrent
    ? palette.white
    : isDisabled
    ? palette.lightGrey
    : palette.darkGrey};
  cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
`;

export const Cont = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${getContStyles};
`;

export const ContentCont = styled.div`
  text-align: center;
`;

export const HeaderCont = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const HelpTextCont = styled.div`
  font-size: 9px;
`;
