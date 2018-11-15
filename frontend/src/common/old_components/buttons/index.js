import 'styles/form_elements.less';
import React from 'react';
import cx from 'classnames';


const Button = ({ type, size, color, hover, classes, children }) => {
    const className = cx('btn', size, color, hover, classes);
    if (type === 'submit') {
        return (
            <button
                type={type}
                className={className}
            >
                {children}
            </button>
        );
    }
    return (
        <div className={className}>{children}</div>
    );
};

Button.defaultProps = {
    size: 'lg',
    type: 'button',
    color: 'black',
    hover: 'hvr-bounce-to-left',
    classes: ''
};

const FacebookButton = ({ signup }) => (
    <Button color={'blue'} classes={'btn-with-icon'}>
        <object
            className={'facebook-icon'}
            type="image/svg+xml"
            data={`${window.django_data.urls.staticRoot}img/facebook.svg`}
        />
        {signup ? pgettext('noun', 'Sign up') : gettext('Log in')}
        {gettext(' with Facebook')}
    </Button>
);

export { Button, FacebookButton };
