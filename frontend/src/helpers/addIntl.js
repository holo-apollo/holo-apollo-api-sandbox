import React from 'react';
import { IntlProvider, injectIntl } from 'react-intl';

const addIntl = Component => {
  const ComponentWithIntl = injectIntl(Component);
  return () => (
    <IntlProvider locale={document.documentElement.lang}>
      <ComponentWithIntl />
    </IntlProvider>
  );
};

export default addIntl;
