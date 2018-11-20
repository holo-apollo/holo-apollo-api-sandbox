import 'styles/spinners.less';
import React, { Component } from 'react';

export class DoubleBounceSpinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    );
  }
}
