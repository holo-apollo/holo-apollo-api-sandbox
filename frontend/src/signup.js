import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './axios_defaults';
import Signup from 'apps/users/containers/signup';


ReactDOM.render(
    <MuiThemeProvider><Signup/></MuiThemeProvider>,
    document.getElementById('react-signup')
);
