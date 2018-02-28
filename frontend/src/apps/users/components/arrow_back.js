import React, {Component} from 'react';
import ReactDOM from 'react-dom';


export default class ArrowBack extends Component {
    static defaultProps = {
        clickHandler: () => {
            window.history.back();
        }
    };

    render() {
        return ReactDOM.createPortal(
            <div className={'arrow-back'} onClick={this.props.clickHandler}>
                <img src={`${window.django_data.urls.staticRoot}img/arrow-back.svg`} />
            </div>,
            document.getElementById('react-arrow-back')
        );
    }
}
