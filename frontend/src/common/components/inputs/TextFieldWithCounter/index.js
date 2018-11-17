import React, { Fragment } from 'react';
import TextFieldMaterial from '@material-ui/core/TextField';
import styled from 'styled-components';
import autoBind from 'react-autobind';

const CounterCont = styled.div`
  width: 100%;
  text-align: right;
  font-size: 10px;
  color: #747474;
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
        <TextFieldMaterial
          {...this.props}
          onChange={this.onChange}
          fullWidth={true}
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
