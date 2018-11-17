import ReactDOM from 'react-dom';

import 'axios_defaults';
import addTheme from 'helpers/addTheme';
import ApplicationForm from '../containers/ApplicationForm';

ReactDOM.render(
  addTheme(ApplicationForm),
  document.querySelector('#react-application-form')
);
