webpackJsonp([1],{

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(34);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(26);

var _axios2 = _interopRequireDefault(_axios);

var _signup = __webpack_require__(245);

var _signup2 = _interopRequireDefault(_signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
_axios2.default.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
_axios2.default.defaults.xsrfCookieName = 'csrftoken';
_axios2.default.defaults.xsrfHeaderName = 'X-CSRFToken';
_axios2.default.defaults.baseURL = '/api/';
_axios2.default.defaults.withCredentials = true;

_reactDom2.default.render(_react2.default.createElement(_signup2.default, null), document.getElementById('react-signup'));

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(246);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactForm = __webpack_require__(135);

var _reactAutobind = __webpack_require__(231);

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

var _classnames = __webpack_require__(52);

var _classnames2 = _interopRequireDefault(_classnames);

var _buttons = __webpack_require__(233);

var _spinners = __webpack_require__(236);

var _validators = __webpack_require__(239);

var _rest = __webpack_require__(240);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_Component) {
    _inherits(Signup, _Component);

    function Signup(props) {
        _classCallCheck(this, Signup);

        var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitPending: false,
            submitErrors: {
                email: null,
                password: null,
                first_name: null,
                last_name: null,
                username: null,
                phone: null
            },
            signupStep: 1,
            formValues: {}
        };
        return _this;
    }

    _createClass(Signup, [{
        key: 'goNext',
        value: function goNext() {
            this.setState({
                signupStep: 2
            });
        }
    }, {
        key: 'goBack',
        value: function goBack() {
            this.setState({
                signupStep: 1
            });
        }
    }, {
        key: 'validateError1',
        value: function validateError1(values) {
            this.setState({ submitErrors: {
                    email: null,
                    password: null,
                    first_name: null,
                    last_name: null,
                    username: null,
                    phone: null
                } });
            var errors = {
                email: null,
                password: null
            };
            if (!values.email) {
                errors.email = gettext('Please type your email.');
            } else if (!(0, _validators.validateEmail)(values.email)) {
                errors.email = gettext('Oops... There\'s a mistake. Please type a valid email.');
            }
            // TODO: add strong password validation
            if (!values.password || !values.password2) {
                errors.password = gettext('Please type your password twice.');
            } else if (values.password !== values.password2) {
                errors.password = gettext('Oops... Passwords didn\'t match');
            }
            return errors;
        }
    }, {
        key: 'validateError2',
        value: function validateError2(values) {
            this.setState({ submitErrors: {
                    email: null,
                    password: null,
                    first_name: null,
                    last_name: null,
                    username: null,
                    phone: null
                } });
            var errors = {
                first_name: null,
                last_name: null,
                username: null,
                phone: null
            };
            if (!(0, _validators.validateLength)(values.first_name, 30, 2)) {
                errors.first_name = gettext('Please type your first name 2-30 characters long.');
            }
            if (!(0, _validators.validateLength)(values.last_name, 30)) {
                errors.first_name = gettext('Max length of last name is 30 characters.');
            }
            if (!(0, _validators.validateLength)(values.username, 30, 2)) {
                errors.username = gettext('Please type your name on the site 2-30 characters long.');
            }
            if (!(0, _validators.validatePhone)(values.phone)) {
                errors.phone = gettext('Please type a valid phone number.');
            }
            return errors;
        }
    }, {
        key: 'onSubmit1',
        value: function onSubmit1(values) {
            this.setState({
                formValues: {
                    email: values.email,
                    password: values.password
                }
            });
            this.goNext();
        }
    }, {
        key: 'onSubmit2',
        value: function onSubmit2(values) {
            var _this2 = this;

            this.setState({
                submitPending: true
            });
            values = _extends({}, this.state.formValues, values);
            (0, _rest.post)('users/', values).then(function () {
                window.location = '/'; // TODO: change it to profile page
            }).catch(function (error) {
                var messages = {
                    common: gettext('Oops! Something went wrong. Please try again in a moment.')
                };
                if (error.response && error.response.data && _typeof(error.response.data) === 'object') {
                    messages = error.response.data;
                }
                _this2.setState({
                    submitPending: false,
                    submitErrors: messages
                });
            });
        }
    }, {
        key: 'renderTextInput',
        value: function renderTextInput(error, fieldName, placeholder) {
            return [_react2.default.createElement(
                'div',
                { className: 'error', key: 'error-' + fieldName },
                error ? error : this.state.submitErrors[fieldName]
            ), _react2.default.createElement(_reactForm.Text, {
                key: 'field-' + fieldName,
                field: fieldName,
                name: fieldName,
                className: 'grow',
                placeholder: placeholder
            })];
        }
    }, {
        key: 'renderForm1',
        value: function renderForm1() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('signup-form', { 'hidden': this.state.submitPending || this.state.signupStep !== 1 }) },
                _react2.default.createElement(
                    _reactForm.Form,
                    {
                        onSubmit: this.onSubmit1,
                        validateError: this.validateError1,
                        dontValidateOnMount: true,
                        validateOnSubmit: true
                    },
                    function (formApi) {
                        return _react2.default.createElement(
                            'form',
                            { onSubmit: formApi.submitForm },
                            _react2.default.createElement(
                                'div',
                                { className: 'inputs' },
                                _this3.renderTextInput(formApi.errors.email, 'email', gettext('Email')),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'error' },
                                    formApi.errors.password
                                ),
                                _react2.default.createElement(_reactForm.Text, {
                                    field: 'password',
                                    type: 'password',
                                    name: 'password',
                                    className: 'grow',
                                    placeholder: gettext('Make up password')
                                }),
                                _react2.default.createElement(_reactForm.Text, {
                                    field: 'password2',
                                    type: 'password',
                                    name: 'password2',
                                    className: 'grow',
                                    placeholder: gettext('Retype password')
                                }),
                                _react2.default.createElement(
                                    _buttons.Button,
                                    { type: 'submit' },
                                    gettext('Create account')
                                )
                            )
                        );
                    }
                )
            );
        }
    }, {
        key: 'renderForm2',
        value: function renderForm2() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('signup-form', { 'hidden': this.state.submitPending || this.state.signupStep !== 2 }) },
                _react2.default.createElement(
                    'div',
                    { onClick: this.goBack },
                    'Go back'
                ),
                _react2.default.createElement(
                    _reactForm.Form,
                    {
                        onSubmit: this.onSubmit2,
                        validateError: this.validateError2,
                        dontValidateOnMount: true,
                        validateOnSubmit: true
                    },
                    function (formApi) {
                        var fields = {
                            first_name: gettext('Your first name *'),
                            last_name: gettext('Your last name'),
                            username: gettext('Name on the site *'),
                            phone: gettext('Phone *')
                        };
                        return _react2.default.createElement(
                            'form',
                            { onSubmit: formApi.submitForm },
                            _react2.default.createElement(
                                'div',
                                { className: 'inputs' },
                                Object.keys(fields).map(function (item) {
                                    return _this4.renderTextInput(formApi.errors[item], item, fields[item]);
                                }),
                                _react2.default.createElement(
                                    _buttons.Button,
                                    { type: 'submit' },
                                    gettext('Save')
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                _this4.state.submitErrors.email
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                _this4.state.submitErrors.common
                            )
                        );
                    }
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'login-signup' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Sign up'
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    'Already a member? ',
                    _react2.default.createElement(
                        'a',
                        { href: '/login/' },
                        'Log in'
                    )
                ),
                this.state.submitPending && _react2.default.createElement(_spinners.DoubleBounceSpinner, null),
                this.renderForm1(),
                this.renderForm2()
            );
        }
    }]);

    return Signup;
}(_react.Component);

exports.default = Signup;

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(247);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(37)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./login_signup.less", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./login_signup.less");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(36)(false);
// imports


// module
exports.push([module.i, ".login-signup .inputs {\n  display: flex;\n  flex-direction: column;\n}\n.login-signup .inputs input {\n  margin-bottom: 10px;\n}\n.login-signup .inputs button {\n  width: 100%;\n}\n.login-signup .error {\n  margin-top: 17px;\n  color: #f57575;\n}\n", ""]);

// exports


/***/ })

},[244]);