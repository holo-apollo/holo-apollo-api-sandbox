// @flow
import React, { PureComponent } from 'react';
import type { IntlShape } from 'react-intl';

import FormStep from 'common/components/navigation/FormStep';
import { StepsControlsCont } from './styled';
import messages from './messages';

type Props = {
  currentStep: number,
  setStep: number => void,
  applicationCreated: boolean,
  intl: IntlShape,
};

class StepsControls extends PureComponent<Props> {
  onClickStepOne = () => {
    if (this.props.currentStep !== 1) {
      this.props.setStep(1);
    }
  };

  onClickStepTwo = () => {
    if (this.props.currentStep !== 2 && this.props.applicationCreated) {
      this.props.setStep(2);
    }
  };

  render() {
    const {
      currentStep,
      applicationCreated,
      intl: { formatMessage },
    } = this.props;
    return (
      <StepsControlsCont>
        <FormStep
          header={formatMessage(messages.stepOneHeader)}
          helpText={formatMessage(messages.stepOneHelptext)}
          isCurrent={currentStep === 1}
          isDisabled={false}
          onClick={this.onClickStepOne}
        />
        <FormStep
          header={formatMessage(messages.stepTwoHeader)}
          helpText={formatMessage(messages.stepTwoHelptext)}
          isCurrent={currentStep === 2}
          isDisabled={currentStep === 1 && !applicationCreated}
          onClick={this.onClickStepTwo}
        />
      </StepsControlsCont>
    );
  }
}

export default StepsControls;
