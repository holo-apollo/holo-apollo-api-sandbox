// @flow
import { withFormik } from 'formik';

import PureUnsubscribe from './PureUnsubscribe';
import handleSubmit from './handleSubmit';

const Unsubscribe = withFormik({ handleSubmit })(PureUnsubscribe);

export default Unsubscribe;
