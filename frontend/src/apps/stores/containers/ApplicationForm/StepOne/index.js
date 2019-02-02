// @flow
import { withFormik } from 'formik';

import PureStepOne from './PureStepOne';
import handleSubmit from './handleSubmit';
import validate from './validate';

const StepOne = withFormik({ handleSubmit, validate })(PureStepOne);

export default StepOne;
