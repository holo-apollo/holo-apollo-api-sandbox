import React from 'react';
import ReactDOM from 'react-dom';

import './axios_defaults';
import PasswordReset from 'apps/users/containers/password_reset';

ReactDOM.render(
  <PasswordReset />,
  document.getElementById('react-password-reset')
);
