// @flow
import React, { Fragment } from 'react';
import type { IntlShape } from 'react-intl';
import type { FormikProps } from 'formik';

import TextField from 'common/components/inputs/TextField';
import Button from 'common/components/buttons/Button';
import DoubleBounceSpinner from 'common/components/spinners/DoubleBounceSpinner';
import type { Values } from './types';
import messages from './messages';
import {
  FormCont,
  StyledH5,
  StyledH4,
  InputsCont,
  SpinnerCont,
  ErrorCont,
} from '../styled';

type Props = FormikProps<Values> & {
  isSuccess: boolean,
  intl: IntlShape,
};

const PureSubscriptionForm = ({
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  submitCount,
  isSuccess,
  intl: { formatMessage },
}: Props) => (
  <Fragment>
    {isSuccess && !errors.alreadySubscribed && (
      <StyledH4>
        {formatMessage(messages.subscribeSuccess)}
        <br />
        {formatMessage(messages.seeYa)}
      </StyledH4>
    )}
    {!isSubmitting && errors.alreadySubscribed && (
      <StyledH4>{errors.alreadySubscribed}</StyledH4>
    )}
    {isSubmitting && (
      <SpinnerCont>
        <DoubleBounceSpinner />
      </SpinnerCont>
    )}
    <FormCont hidden={isSubmitting || isSuccess}>
      <StyledH5>{formatMessage(messages.getNotified)}</StyledH5>
      <form onSubmit={handleSubmit}>
        <InputsCont>
          <TextField
            name="email"
            type="email"
            onChange={handleChange}
            placeholder={formatMessage(messages.emailPlaceholder)}
            inputProps={{ style: { flexGrow: 1, padding: 0, height: '50px' } }}
          />
          <Button
            type="submit"
            width={200}
            height={50}
            fontSize={18}
            fontWeight="300"
          >
            {formatMessage(messages.buttonText)}
          </Button>
        </InputsCont>
        {submitCount > 0 && (errors.email || errors.nonFieldErrors) && (
          <ErrorCont>* {errors.email || errors.nonFieldErrors}</ErrorCont>
        )}
      </form>
    </FormCont>
  </Fragment>
);

export default PureSubscriptionForm;
