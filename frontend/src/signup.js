import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Signup from 'apps/users/containers/signup';


axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.baseURL = '/api/';
axios.defaults.withCredentials = true;


ReactDOM.render(<Signup/>, document.getElementById('react-signup'));
