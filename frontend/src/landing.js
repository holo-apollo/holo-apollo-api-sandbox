import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Subscription from 'apps/landing/containers/subscription';


axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.baseURL = '/api/';
axios.defaults.withCredentials = true;


ReactDOM.render(<Subscription/>, document.getElementById('react-subscription'));
