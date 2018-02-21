import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './axios_defaults';
import Login from 'apps/users/containers/login';


ReactDOM.render(
    <MuiThemeProvider><Login/></MuiThemeProvider>,
    document.getElementById('react-login')
);
