import React, { Fragment } from 'react';
import autoBind from 'react-autobind';

import StepsControls from './StepsControls';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

class ApplicationForm extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      applicationId: undefined,
      step: 1,
    };
  }

  onStepOneSuccess(applicationId) {
    this.setState({ applicationId, step: 2 });
  }

  setStep(step) {
    this.setState({ step });
  }

  render() {
    const { step, applicationId } = this.state;
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
        />
        <StepTwo applicationId={applicationId} visible={step === 2} />
      </Fragment>
    );
  }
}

export default ApplicationForm;
