// @flow
import React from 'react';

import { Cont, ContentCont, HeaderCont, HelpTextCont } from './styled';

type Props = {
  isCurrent: boolean,
  isDisabled: boolean,
  header: string,
  helpText: string,
};

const FormStep = ({ isCurrent, isDisabled, header, helpText }: Props) => (
  <Cont isCurrent={isCurrent} isDisabled={isDisabled}>
    <ContentCont>
      <HeaderCont>{header}</HeaderCont>
      <HelpTextCont>{helpText}</HelpTextCont>
    </ContentCont>
  </Cont>
);

export default FormStep;
