import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class ArrowBack extends Component {
  static defaultProps = {
    clickHandler: () => {
      window.history.back();
    },
  };

  render() {
    return (
      <div className={'arrow-back'} onClick={this.props.clickHandler}>
        <img src={`${window.django_data.urls.staticRoot}img/arrow-back.svg`} />
      </div>
    );
  }
}

export default class ArrowBackWrapper extends Component {
  render() {
    return ReactDOM.createPortal(
      <ArrowBack {...this.props} />,
      document.getElementById('react-arrow-back')
    );
  }
}
