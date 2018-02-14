import 'styles/form_elements.less';
import React, {Component} from 'react';
import cx from 'classnames';


export class Button extends Component {
    static defaultProps = {
        size: 'lg',
        type: 'submit',
        color: 'black',
        hover: 'hvr-bounce-to-left'
    };

    render() {
        return (
            <button
                type={this.props.type}
                className={cx(this.props.size, this.props.color, this.props.hover)}
            >
                {this.props.children}
            </button>
        );
    }
}
