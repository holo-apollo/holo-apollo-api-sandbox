import styled, { css } from 'styled-components';
import palette from 'common/palette';

const getFormStyles = ({ isSubmitting }) => css`
  ${isSubmitting && 'position: absolute; top: -9999px; left: -9999px;'}
`;

export const StyledForm = styled.form`
  ${getFormStyles};
`;

export const FieldCont = styled.div`
  margin-bottom: 40px;
`;

export const SpinnerCont = styled.div`
  display: flex;
  justify-content: center;
`;

export const ErrorCont = styled.div`
  margin-bottom: 20px;
  color: ${palette.red};
  text-align: center;
  font-size: 10px;
`;
