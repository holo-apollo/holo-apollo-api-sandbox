// @flow
import type { IntlShape } from 'react-intl';

import { validateEmail } from 'helpers/validators';
import type { Values } from './types';
import messages from './messages';

type Props = {
  intl: IntlShape,
};

function validate(values: Values, { intl }: Props) {
  const errors = {};
  if (!values.email) {
    errors.email = intl.formatMessage(messages.emptyEmail);
  } else if (!validateEmail(values.email)) {
    errors.email = intl.formatMessage(messages.invalidEmail);
  }
  return errors;
}

export default validate;
