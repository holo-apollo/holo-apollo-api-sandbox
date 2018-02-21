import 'styles/form_elements.less';
import React, {Component} from 'react';
import cx from 'classnames';


export class Button extends Component {
    static defaultProps = {
        size: 'lg',
        type: 'button',
        color: 'black',
        hover: 'hvr-bounce-to-left'
    };

    render() {
        const classes = cx('btn', this.props.size, this.props.color, this.props.hover);
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
