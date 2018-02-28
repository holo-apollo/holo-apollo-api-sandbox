import 'styles/form_elements.less';
import React, {Component} from 'react';
import cx from 'classnames';


export class Button extends Component {
    static defaultProps = {
        size: 'lg',
        type: 'button',
        color: 'black',
        hover: 'hvr-bounce-to-left',
        classes: ''
    };

    render() {
        const classes = cx('btn', this.props.size, this.props.color, this.props.hover, this.props.classes);
        if (this.props.type === 'submit') {
            return (
                <button
                    type={this.props.type}
                    className={classes}
                >
                    {this.props.children}
                </button>
            );
        }
        return (
            <div className={classes}>{this.props.children}</div>
        );
    }
}


export class FacebookButton extends Component {
    render() {
        return (
            <Button color={'blue'} classes={'btn-with-icon'}>
                <object
                    className={'facebook-icon'}
                    type="image/svg+xml"
                    data={`${window.django_data.urls.staticRoot}img/facebook.svg`}
                />
                {this.props.signup ? pgettext('noun', 'Sign up') : gettext('Log in')}
                {gettext(' with Facebook')}
            </Button>
        );
    }
}
