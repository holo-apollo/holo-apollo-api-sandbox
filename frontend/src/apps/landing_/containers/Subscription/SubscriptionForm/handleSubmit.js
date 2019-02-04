// @flow
import type { FormikBag } from 'formik';
import type { IntlShape } from 'react-intl';

import { api } from 'helpers/rest';
import type { Values } from './types';
import messages from './messages';

type Props = {
  intl: IntlShape,
  setSuccess: boolean => void,
};

async function handleSubmit(
  values: Values,
  {
    props: {
      intl: { formatMessage },
      setSuccess,
    },
    setSubmitting,
    setFieldError,
  }: FormikBag<Props, Values>
) {
  const resp = await api.post('subscriptions/', values);
  if (resp.ok && resp.data) {
    const alreadySubscribed = resp.data.already_subscribed;
    if (alreadySubscribed) {
      setFieldError(
        'alreadySubscribed',
        formatMessage(messages.alreadySubscribed)
      );
    }
    setSuccess(true);
  } else {
    if (resp.data && resp.data.email) {
      setFieldError('email', resp.data.email[0]);
    } else {
      setFieldError('notFieldErrors', messages.unknownError);
    }
  }
  setSubmitting(false);
}

export default handleSubmit;
