// @flow
import styled, { css } from 'styled-components';
import palette from 'common/palette';

export const Cont = styled.div`
  margin-top: 50px;
`;

const getFormContStyles = ({ hidden }: { hidden: boolean }) => css`
  ${hidden && 'display: none'};
`;

export const FormCont = styled.div`
  ${getFormContStyles};
`;

export const ErrorCont = styled.div`
  color: ${palette.red};
  text-align: center;
  margin-top: 17px;
  font-size: 10px;
`;

export const StyledH5 = styled.h5`
  font-size: 16px;
  font-weight: 300;
  margin: 10px 0;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

export const SpinnerCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledH4 = styled.h4`
  font-size: 36px;
  font-weight: bold;
  margin: 10px 0;

  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`;

export const InputsCont = styled.div`
  display: flex;
  max-width: 500px;
  margin-top: 18px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 767px) {
    flex-direction: column;

    button {
      margin-top: 10px;
      width: 100%;
    }
  }
`;

export const PromiseCont = styled.div`
  margin-top: 45px;
  color: ${palette.lightGrey};
`;
