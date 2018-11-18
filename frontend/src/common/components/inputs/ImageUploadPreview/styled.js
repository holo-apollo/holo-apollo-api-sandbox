import styled from 'styled-components';

import palette from 'common/palette';

export const Cont = styled.div``;

export const LabelTextCont = styled.div`
  color: ${palette.grey};
  font-size: 12px;
  margin-bottom: 10px;
  text-align: left;
`;

export const StyledLabel = styled.label`
  color: ${palette.blue};
  cursor: pointer;

  &:hover {
    color: ${palette.darkerBlue};

    svg {
      fill: ${palette.darkerBlue};

      g {
        fill: ${palette.darkerBlue};
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

  &:nth-child(4n) {
    margin-right: 0;
  }
`;

export const StyledImg = styled.img`
  width: 88px;
  height: 88px;
  object-fit: cover;
  border: 1px solid ${palette.extraDarkGrey};
`;

export const CloseCont = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;
