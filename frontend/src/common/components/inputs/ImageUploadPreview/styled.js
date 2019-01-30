import styled, { css } from 'styled-components';

import palette from 'common/palette';

const getLabelStyles = ({ error }) => css`
  color: ${error ? palette.red : palette.grey};
`;

export const LabelTextCont = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
  text-align: left;

  ${getLabelStyles};
`;

export const StyledLabel = styled.label`
  color: ${palette.blue};
  cursor: pointer;

  &:hover {
    color: ${palette.deepBlue};

    svg {
      fill: ${palette.deepBlue};

      g {
        fill: ${palette.deepBlue};
      }
    }
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const ButtonTextCont = styled.div`
  display: flex;
  font-size: 12px;

  svg {
    margin-right: 5px;
  }
`;

export const HelpTextCont = styled.div`
  font-size: 10px;
  color: ${palette.grey};
  text-align: left;
`;

export const ImagesCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
`;

export const ImageCont = styled.div`
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;

  @media (min-width: 460px) {
    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (min-width: 350px) and (max-width: 459px) {
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 349px) {
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

export const StyledImg = styled.img`
  width: 88px;
  height: 88px;
  object-fit: cover;
  border: 1px solid ${palette.darkGrey};
`;

export const CloseCont = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;
