// @flow
import React, { Fragment } from 'react';
import type { IntlShape } from 'react-intl';

import type { SelectOption } from 'common/types';
import StepsControls from './StepsControls';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

type Props = {
  applicationId?: number,
  step: number,
  categoryOptions: SelectOption<string>[],
  intl: IntlShape,
  setStep: number => void,
  onStepOneSuccess: number => void,
};

const PureApplicationForm = ({
  applicationId,
  step,
  categoryOptions,
  setStep,
  onStepOneSuccess,
  intl,
}: Props) => (
  <Fragment>
    <StepsControls
      currentStep={step}
      setStep={setStep}
      applicationCreated={Boolean(applicationId)}
      intl={intl}
    />
    <StepOne
      onSuccess={onStepOneSuccess}
      applicationId={applicationId}
      visible={step === 1}
      categoryOptions={categoryOptions}
      intl={intl}
    />
    {applicationId && (
      <StepTwo applicationId={applicationId} visible={step === 2} intl={intl} />
    )}
  </Fragment>
);

export default PureApplicationForm;
