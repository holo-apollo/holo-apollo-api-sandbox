// @flow
import type { FormikBag } from 'formik';
import type { IntlShape } from 'react-intl';

import { api } from 'helpers/rest';
import messages from './messages';
import type { Values } from './types';

type Props = {
  applicationId?: number,
  intl: IntlShape,
  onSuccess: number => void,
};

async function handleSubmit(
  values: Values,
  {
    props: {
      applicationId,
      intl: { formatMessage },
      onSuccess,
    },
    setSubmitting,
    setFieldError,
  }: FormikBag<Props, Values>
) {
  let resp;
  if (applicationId) {
    resp = await api.put(`stores/applications/${applicationId}/`, values);
  } else {
    resp = await api.post('stores/applications/', values);
  }
  if (resp.ok && resp.data) {
    if (resp.data.id) {
      onSuccess(resp.data.id);
    } else {
      setFieldError(
        'nonFieldErrors',
        formatMessage(messages.unknownError, {
          errorCode: 'No application id in response data',
        })
      );
    }
  } else {
    if (resp.data) {
      Object.keys(resp.data).forEach(field => {
        setFieldError(field, resp.data[field][0]);
      });
    } else {
      setFieldError(
        'nonFieldErrors',
        formatMessage(messages.unknownError, { errorCode: resp.status })
      );
    }
  }
  setSubmitting(false);
}

export default handleSubmit;
