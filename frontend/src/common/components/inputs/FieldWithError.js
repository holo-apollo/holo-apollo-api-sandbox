// @flow
import * as React from 'react';
import styled from 'styled-components';
import palette from 'common/palette';

const ErrorCont = styled.div`
  margin-top: 10px;
  color: ${palette.red};
  text-align: center;
  font-size: 10px;
`;

type Props = {
  errorText?: string,
  children: React.Node,
};

const FieldWithError = ({ errorText, children }: Props) => (
  <React.Fragment>
    {children}
    {errorText && <ErrorCont>* {errorText}</ErrorCont>}
  </React.Fragment>
);

export default FieldWithError;
