import ReactDOM from 'react-dom';

import addIntl from 'helpers/addIntl';
import addTheme from 'helpers/addTheme';
import Subscription from '../containers/Subscription';

ReactDOM.render(
  addTheme(addIntl(Subscription)),
  document.querySelector('#react-subscription')
);
