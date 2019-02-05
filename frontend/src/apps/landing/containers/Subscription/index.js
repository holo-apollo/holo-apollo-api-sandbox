// @flow
import React from 'react';
import type { IntlShape } from 'react-intl';

import { getQueryParams } from 'helpers/utils';
import PureSubscription from './PureSubscription';

type Props = {
  intl: IntlShape,
};

const Subscription = ({ intl }: Props) => (
  <PureSubscription intl={intl} token={getQueryParams().token} />
);

export default Subscription;
