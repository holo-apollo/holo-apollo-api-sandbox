import React from 'react';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import uk from 'react-intl/locale-data/uk';

import localeData from '../../i18n/locale/data.json';

const lang = document.documentElement.lang;
const messages = localeData[lang] || localeData.en;

const addIntl = Component => {
  switch (lang) {
    case 'ru':
      addLocaleData(ru);
      break;
    case 'uk':
      addLocaleData(uk);
      break;
    default:
      addLocaleData(en);
  }

  const ComponentWithIntl = injectIntl(Component);
  return () => (
    <IntlProvider locale={document.documentElement.lang} messages={messages}>
      <ComponentWithIntl />
    </IntlProvider>
  );
};

export default addIntl;
