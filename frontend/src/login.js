import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Login from 'apps/users/containers/login';


axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.baseURL = '/api/';
axios.defaults.withCredentials = true;


ReactDOM.render(<Login/>, document.getElementById('react-login'));
