// @flow
import { withFormik } from 'formik';
import { withState, compose } from 'recompose';

import PureSubscriptionForm from './PureSubscriptionForm';
import handleSubmit from './handleSubmit';
import validate from './validate';

const SubscriptionForm = compose(
  // $FlowFixMe
  withState('isSuccess', 'setSuccess', false),
  withFormik({ handleSubmit, validate })
)(PureSubscriptionForm);

export default SubscriptionForm;
