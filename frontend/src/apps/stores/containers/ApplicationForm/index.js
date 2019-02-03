// @flow
import React from 'react';
import autoBind from 'react-autobind';
import type { IntlShape } from 'react-intl';

import type { SelectOption } from 'common/types';
import { api } from 'helpers/rest';
import PureApplicationForm from './PureApplicationForm';

type Props = {
  intl: IntlShape,
};

type State = {
  applicationId?: number,
  step: number,
  categoryOptions: SelectOption<string>[],
};

class ApplicationForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    autoBind(this);
    this.state = {
      applicationId: undefined,
      step: 1,
      categoryOptions: [],
    };
  }

  componentDidMount() {
    this.fetchCategoryOptions();
  }

  async fetchCategoryOptions() {
    const resp = await api.get('stores/applications/categories/');
    if (resp.ok && resp.data) {
      this.setState({ categoryOptions: resp.data });
    }
  }

  onStepOneSuccess(applicationId: number) {
    this.setState({ applicationId, step: 2 });
  }

  setStep(step: number) {
    this.setState({ step });
  }

  render() {
    return (
      <PureApplicationForm
        {...this.props}
        {...this.state}
        setStep={this.setStep}
        onStepOneSuccess={this.onStepOneSuccess}
      />
    );
  }
}

export default ApplicationForm;
