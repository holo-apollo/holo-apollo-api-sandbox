import React, { Fragment } from 'react';
import styled from 'styled-components';
import autoBind from 'react-autobind';

import palette from 'common/palette';
import TextField from 'common/components/inputs/TextField';

const CounterCont = styled.div`
  width: 100%;
  text-align: right;
  font-size: 8px;
  color: ${palette.grey};
  margin-top: 10px;
`;

class TextFieldWithCounter extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      value: '',
    };
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange && this.props.onChange(event);
  }

  render() {
    return (
      <Fragment>
        <TextField
          {...this.props}
          onChange={this.onChange}
          inputProps={{ maxLength: this.props.maxLength }}
        />
        <CounterCont>
          {this.state.value.length}/{this.props.maxLength}
        </CounterCont>
      </Fragment>
    );
  }
}

export default TextFieldWithCounter;
