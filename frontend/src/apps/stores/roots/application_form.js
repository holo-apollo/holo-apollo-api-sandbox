import ReactDOM from 'react-dom';

import addIntl from 'helpers/addIntl';
import addTheme from 'helpers/addTheme';
import ApplicationForm from '../containers/ApplicationForm';

ReactDOM.render(
  addTheme(addIntl(ApplicationForm)),
  document.querySelector('#react-application-form')
);
