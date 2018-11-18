import ReactDOM from 'react-dom';

import addTheme from 'helpers/addTheme';
import ApplicationForm from '../containers/ApplicationForm';

ReactDOM.render(
  addTheme(ApplicationForm),
  document.querySelector('#react-application-form')
);
