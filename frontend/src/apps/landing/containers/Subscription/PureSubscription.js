// @flow
import React from 'react';
import type { IntlShape } from 'react-intl';

import SubscriptionForm from './SubscriptionForm';
import Unsubscribe from './Unsubscribe';
import { Cont, PromiseCont } from './styled';
import messages from './messages';

type Props = {
  token?: string,
  intl: IntlShape,
};

const PureSubscription = ({ token, intl }: Props) => (
  <Cont>
    {token && <Unsubscribe token={token} intl={intl} />}
    {!token && <SubscriptionForm intl={intl} />}
    <PromiseCont>{intl.formatMessage(messages.noSpam)}</PromiseCont>
  </Cont>
);

export default PureSubscription;
