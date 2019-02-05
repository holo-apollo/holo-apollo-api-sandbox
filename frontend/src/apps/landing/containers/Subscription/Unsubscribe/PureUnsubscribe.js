// @flow
import React, { Fragment } from 'react';
import type { IntlShape } from 'react-intl';
import type { FormikProps } from 'formik';
import { isEmpty } from 'ramda';

import Button from 'common/components/buttons/Button';
import DoubleBounceSpinner from 'common/components/spinners/DoubleBounceSpinner';
import type { Values } from './types';
import messages from './messages';
import {
  FormCont,
  ErrorCont,
  StyledH5,
  SpinnerCont,
  StyledH4,
} from '../styled';

type Props = FormikProps<Values> & {
  intl: IntlShape,
};

const PureUnsubscribe = ({
  errors,
  handleSubmit,
  isSubmitting,
  submitCount,
  intl: { formatMessage },
}: Props) => {
  const isSuccess = submitCount > 0 && isEmpty(errors);
  return (
    <Fragment>
      {isSuccess && (
        <StyledH4>
          {formatMessage(messages.unsubscribeSuccess)}
          <br />
          {formatMessage(messages.seeYouAgain)}
        </StyledH4>
      )}
      {isSubmitting && (
        <SpinnerCont>
          <DoubleBounceSpinner />
        </SpinnerCont>
      )}
      {errors.nonFieldErrors && <ErrorCont>{errors.nonFieldErrors}</ErrorCont>}
      <FormCont hidden={isSubmitting || isSuccess}>
        <StyledH5>{formatMessage(messages.confirmUnsubscribe)}</StyledH5>
        <Button
          width={200}
          height={50}
          fontSize={18}
          fontWeight="300"
          onClick={handleSubmit}
        >
          {formatMessage(messages.yesUnsubscribe)}
        </Button>
      </FormCont>
    </Fragment>
  );
};

export default PureUnsubscribe;
