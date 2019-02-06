// @flow
import type { FormikBag } from 'formik';
import type { IntlShape } from 'react-intl';

import { api } from 'helpers/rest';
import type { Values } from './types';
import messages from './messages';

type Props = {
  token: string,
  intl: IntlShape,
};

async function handleSubmit(
  values: Values,
  {
    props: {
      token,
      intl: { formatMessage },
    },
    setSubmitting,
    setFieldError,
  }: FormikBag<Props, Values>
) {
  const resp = await api.post('subscriptions/unsubscribe/', { token });
  if (!resp.ok) {
    let error;
    if (resp.data && resp.data.detail) {
      error = resp.data.detail;
    } else {
      error = formatMessage(messages.unknownError);
    }
    setFieldError('nonFieldErrors', error);
  }
  setSubmitting(false);
}

export default handleSubmit;
