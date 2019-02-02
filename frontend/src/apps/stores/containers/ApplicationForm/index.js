// @flow
import React, { Fragment } from 'react';
import autoBind from 'react-autobind';
import type { IntlShape } from 'react-intl';

import StepsControls from './StepsControls';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

type Props = {
  intl: IntlShape,
};

type State = {
  applicationId?: number,
  step: number,
};

class ApplicationForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    autoBind(this);
    this.state = {
      applicationId: undefined,
      step: 1,
    };
  }

  onStepOneSuccess(applicationId: number) {
    this.setState({ applicationId, step: 2 });
  }

  setStep(step: number) {
    this.setState({ step });
  }

  render() {
    const { step, applicationId } = this.state;
    const { intl } = this.props;
    return (
      <Fragment>
        <StepsControls
          currentStep={step}
          setStep={this.setStep}
          applicationCreated={Boolean(applicationId)}
        />
        <StepOne
          onSuccess={this.onStepOneSuccess}
          applicationId={applicationId}
          visible={step === 1}
          intl={intl}
        />
        <StepTwo
          applicationId={applicationId}
          visible={step === 2}
          intl={intl}
        />
      </Fragment>
    );
  }
}

export default ApplicationForm;
