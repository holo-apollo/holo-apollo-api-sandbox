webpackJsonp([0],{

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(36);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(37);

var _subscription = __webpack_require__(140);

var _subscription2 = _interopRequireDefault(_subscription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_subscription2.default, null), document.getElementById('react-subscription'));

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(141);

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

var _utils = __webpack_require__(244);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subscription = function (_Component) {
    _inherits(Subscription, _Component);

    function Subscription(props) {
        _classCallCheck(this, Subscription);

        var _this = _possibleConstructorReturn(this, (Subscription.__proto__ || Object.getPrototypeOf(Subscription)).call(this, props));

        (0, _reactAutobind2.default)(_this);
        _this.state = {
            submitSuccess: false,
            alreadySubscribed: false,
            submitPending: false,
            submitErrors: { email: null },
            unsubscribeSuccess: false,
            unsubscribeError: ''
        };
        _this._token = (0, _utils.getQueryParams)().token;
        return _this;
    }

    _createClass(Subscription, [{
        key: 'validateError',
        value: function validateError(values) {
            this.setState({ submitErrors: { email: null } });
            if (!values.email) {
                return { email: gettext('Please type your email.') };
            } else if (!(0, _validators.validateEmail)(values.email)) {
                return { email: gettext('Oops... There\'s a mistake. Please type a valid email.') };
            }
            return { email: null };
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(values) {
            var _this2 = this;

            this.setState({
                submitSuccess: false,
                submitPending: true
            });
            (0, _rest.post)('subscriptions/', values).then(function (response) {
                _this2.setState({
                    submitSuccess: true,
                    submitPending: false,
                    alreadySubscribed: response.data.already_subscribed
                });
            }).catch(function (error) {
                var message = gettext('Oops! Something went wrong. Please try again in a moment.');
                if (error.response && error.response.data.email) {
                    message = error.response.data.email[0];
                }
                _this2.setState({
                    submitPending: false,
                    submitErrors: { email: message }
                });
            });
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            var _this3 = this;

            this.setState({ submitPending: true });
            (0, _rest.post)('subscriptions/unsubscribe/', { token: this._token }).then(function () {
                _this3.setState({
                    unsubscribeSuccess: true,
                    submitPending: false
                });
            }).catch(function (error) {
                var message = gettext('Oops! Something went wrong. Please try again in a moment.');
                if (error.response && error.response.data.detail) {
                    message = error.response.data.detail;
                }
                _this3.setState({
                    submitPending: false,
                    unsubscribeError: message
                });
            });
        }
    }, {
        key: 'renderForm',
        value: function renderForm() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('subscription-form', { 'hidden': this.state.submitSuccess || this.state.submitPending }) },
                _react2.default.createElement(
                    'h5',
                    null,
                    gettext('Get notified when it\'s ready')
                ),
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
                                _react2.default.createElement(_reactForm.Text, {
                                    field: 'email',
                                    name: 'email',
                                    className: 'grow',
                                    placeholder: 'Email'
                                }),
                                _react2.default.createElement(
                                    _buttons.Button,
                                    { type: 'submit' },
                                    gettext('Subscribe')
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                formApi.errors.email,
                                _this4.state.submitErrors.email
                            )
                        );
                    }
                )
            );
        }
    }, {
        key: 'renderUnsubscribe',
        value: function renderUnsubscribe() {
            if (this.state.unsubscribeError) {
                return _react2.default.createElement(
                    'div',
                    { className: 'error' },
                    this.state.unsubscribeError
                );
            }
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('unsubscribe', { 'hidden': this.state.unsubscribeSuccess || this.state.submitPending }) },
                _react2.default.createElement(
                    'h5',
                    null,
                    gettext('Are you sure that you want to unsubscribe?')
                ),
                _react2.default.createElement(
                    'span',
                    { onClick: this.unsubscribe },
                    _react2.default.createElement(
                        _buttons.Button,
                        null,
                        gettext('Yes, I\'m sure')
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'subscription' },
                this.state.submitSuccess && !this.state.alreadySubscribed && _react2.default.createElement(
                    'h4',
                    null,
                    gettext('You were subscribed successfully!'),
                    _react2.default.createElement('br', null),
                    gettext('See ya!')
                ),
                this.state.submitSuccess && this.state.alreadySubscribed && _react2.default.createElement(
                    'h4',
                    null,
                    gettext('Looks like you are already subscribed.'),
                    _react2.default.createElement('br', null),
                    gettext('Thank you for being with us!')
                ),
                this.state.unsubscribeSuccess && _react2.default.createElement(
                    'h4',
                    null,
                    gettext('You were unsubscribed.'),
                    _react2.default.createElement('br', null),
                    gettext('Hope to see you again.')
                ),
                this.state.submitPending && _react2.default.createElement(_spinners.DoubleBounceSpinner, null),
                this._token ? this.renderUnsubscribe() : this.renderForm(),
                _react2.default.createElement(
                    'div',
                    { className: 'promise' },
                    gettext('We promise to never spam you or share your personal information!')
                )
            );
        }
    }]);

    return Subscription;
}(_react.Component);

exports.default = Subscription;

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(142);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(20)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./subscription.less", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./subscription.less");

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

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)(false);
// imports


// module
exports.push([module.i, ".subscription {\n  margin-top: 50px;\n}\n.subscription .inputs {\n  max-width: 500px;\n  margin-top: 18px;\n  margin-left: auto;\n  margin-right: auto;\n  display: flex;\n}\n.subscription .error {\n  margin-top: 17px;\n  color: #f57575;\n}\n.subscription .promise {\n  margin-top: 45px;\n  color: #a1a1a1;\n}\n@media screen and (max-width: 767px) {\n  .subscription .inputs {\n    flex-direction: column;\n  }\n  .subscription .inputs button {\n    margin-top: 10px;\n    width: 100%;\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getQueryParams = getQueryParams;
function getQueryParams() {
    var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.location.search;

    qs = qs.split('+').join(' ');

    var params = {};
    var tokens = void 0;
    var re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

/***/ })

},[111]);