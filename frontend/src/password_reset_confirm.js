import React from 'react';
import ReactDOM from 'react-dom';

import './axios_defaults';
import PasswordResetConfirm from 'apps/users/containers/password_reset_confirm';

ReactDOM.render(
  <PasswordResetConfirm />,
  document.getElementById('react-password-reset-confirm')
);
