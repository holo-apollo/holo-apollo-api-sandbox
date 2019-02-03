// @flow
import type { IntlShape } from 'react-intl';

import { validateEmail, validateLength } from 'helpers/validators';
import type { Values } from './types';
import messages from './messages';
import { TEXTAREAS_MIN_LENGTH, TEXTAREAS_MAX_LENGTH } from './constants';

type Props = {
  intl: IntlShape,
};

function validate(values: Values, { intl }: Props) {
  const errors = {};
  const requiredFields = [
    'name',
    'email',
    'instagram_name',
    'category',
    'selling_goods',
    'goods_description',
    'philosophy',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = intl.formatMessage(messages.fieldRequired);
    }
  });
  if (!validateEmail(values.email)) {
    errors.email = intl.formatMessage(messages.invalidEmail);
  }
  if (!values.data_usage_agreement) {
    errors.data_usage_agreement = intl.formatMessage(
      messages.usageAgreementRequired
    );
  }
  ['goods_description', 'philosophy'].forEach(field => {
    if (
      !validateLength(values[field], TEXTAREAS_MAX_LENGTH, TEXTAREAS_MIN_LENGTH)
    ) {
      errors[field] = intl.formatMessage(messages.invalidLength, {
        minLength: TEXTAREAS_MIN_LENGTH,
        maxLength: TEXTAREAS_MAX_LENGTH,
      });
    }
  });
  return errors;
}

export default validate;
