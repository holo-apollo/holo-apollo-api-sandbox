import React, { PureComponent } from 'react';

import FormStep from 'common/components/navigation/FormStep';
import { StepsControlsCont } from './styled';

class StepsControls extends PureComponent {
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
    const { currentStep, applicationCreated } = this.props;
    return (
      <StepsControlsCont>
        <FormStep
          header={gettext('Step 1')}
          helpText={gettext('information')}
          isCurrent={currentStep === 1}
          isDisabled={false}
          onClick={this.onClickStepOne}
        />
        <FormStep
          header={gettext('Step 2')}
          helpText={gettext('photos')}
          isCurrent={currentStep === 2}
          isDisabled={currentStep === 1 && !applicationCreated}
          onClick={this.onClickStepTwo}
        />
      </StepsControlsCont>
    );
  }
}

export default StepsControls;
