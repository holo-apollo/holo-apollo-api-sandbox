webpackJsonp([2],{

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(36);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(37);

var _login = __webpack_require__(246);

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_login2.default, null), document.getElementById('react-login'));

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(64);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactForm = __webpack_require__(39);

var _reactAutobind = __webpack_require__(59);

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

var _classnames = __webpack_require__(26);

var _classnames2 = _interopRequireDefault(_classnames);

var _buttons = __webpack_require__(60);

var _spinners = __webpack_require__(61);

var _validators = __webpack_require__(62);

var _rest = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
    _inherits(Login, _Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitPending: false,
            submitError: null
        };
        return _this;
    }

    _createClass(Login, [{
        key: 'validateError',
        value: function validateError(values) {
            this.setState({ submitError: null });
            var errors = {
                username: null,
                password: null
            };
            if (!values.username) {
                errors.username = gettext('Please type your email or phone.');
            } else if (!(0, _validators.validateEmail)(values.username) && !(0, _validators.validatePhone)(values.username)) {
                errors.username = gettext('Oops... There\'s a mistake. Please type a valid email or phone.');
            }
            if (!values.password) {
                errors.password = gettext('Please type your password.');
            }
            return errors;
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(values) {
            var _this2 = this;

            this.setState({
                submitPending: true
            });
            (0, _rest.post)('users/login/', values).then(function () {
                window.location = '/'; // TODO: this should be value of 'next' query param
            }).catch(function (error) {
                var message = gettext('Oops! Something went wrong. Please try again in a moment.');
                if (error.response && error.response.data.detail) {
                    message = error.response.data.detail;
                }
                _this2.setState({
                    submitPending: false,
                    submitError: message
                });
            });
        }
    }, {
        key: 'renderForm',
        value: function renderForm() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('login-form', { 'hidden': this.state.submitPending }) },
                _react2.default.createElement(
                    _reactForm.Form,
                    {
                        onSubmit: this.onSubmit,
                        validateError: this.validateError,
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
                                _react2.default.createElement(
                                    'div',
                                    { className: 'error' },
                                    formApi.errors.username
                                ),
                                _react2.default.createElement(_reactForm.Text, {
                                    field: 'username',
                                    name: 'username',
                                    className: 'grow',
                                    placeholder: gettext('Email or phone')
                                }),
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
                                    placeholder: gettext('Password')
                                }),
                                _react2.default.createElement(
                                    _buttons.Button,
                                    { type: 'submit' },
                                    gettext('Log in')
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                _this3.state.submitError
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
                    'Log in'
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    'Don\'t have an account? ',
                    _react2.default.createElement(
                        'a',
                        { href: '/signup/' },
                        'Sign up'
                    )
                ),
                this.state.submitPending && _react2.default.createElement(_spinners.DoubleBounceSpinner, null),
                this.renderForm()
            );
        }
    }]);

    return Login;
}(_react.Component);

exports.default = Login;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(65);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(20)(content, options);

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

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, ".login-signup .inputs {\n  display: flex;\n  flex-direction: column;\n}\n.login-signup .inputs input {\n  margin-bottom: 10px;\n}\n.login-signup .inputs button {\n  width: 100%;\n}\n.login-signup .error {\n  margin-top: 17px;\n  color: #f57575;\n}\n", ""]);

// exports


/***/ })

},[245]);